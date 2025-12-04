import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        return user
    } catch (error) {
        console.error('Failed to fetch user:', error)
        throw new Error('Failed to fetch user.')
    }
}

async function recordAttempt(email: string, isSuccessful: boolean, ipAddress: string) {
    try {
        await prisma.authAttempt.create({
            data: {
                email,
                isSuccessful,
                ipAddress
            }
        })
    } catch (error) {
        console.error('Failed to record auth attempt:', error)
    }
}

async function checkRateLimit(email: string, ipAddress: string) {
    const windowMinutes = 15
    const maxAttempts = 5
    const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000)

    const attempts = await prisma.authAttempt.count({
        where: {
            OR: [
                { email },
                { ipAddress }
            ],
            isSuccessful: false,
            attemptedAt: {
                gte: windowStart
            }
        }
    })

    return attempts >= maxAttempts
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, request) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data

                    // Get IP from headers or fallback
                    // Note: In NextAuth v5, request might not always be available in authorize depending on usage
                    // For now we'll use a placeholder if request is missing, but in production this should be passed
                    const ipAddress = "unknown"

                    if (await checkRateLimit(email, ipAddress)) {
                        throw new Error("Too many login attempts. Please try again later.")
                    }

                    const user = await getUser(email)
                    if (!user) {
                        await recordAttempt(email, false, ipAddress)
                        return null
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password || "")
                    if (passwordsMatch) {
                        await recordAttempt(email, true, ipAddress)
                        return { id: user.id, name: user.name, email: user.email, role: user.role }
                    }

                    await recordAttempt(email, false, ipAddress)
                }

                console.log("Invalid credentials")
                return null
            },
        }),
    ],
})
