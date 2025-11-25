import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Mock auth for MVP - Replace with DB check later
                if (credentials.email === "admin@example.com" && credentials.password === "admin123") {
                    return { id: "1", name: "Admin", email: "admin@example.com", role: "ADMIN" }
                }
                return null
            },
        }),
    ],
})
