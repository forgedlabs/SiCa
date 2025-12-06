import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const SITE_PASSWORD = process.env.SITE_PASSWORD || "SICA2026"
const COOKIE_NAME = "site_access"

export async function POST(request: Request) {
    try {
        const { password } = await request.json()

        if (password === SITE_PASSWORD) {
            const cookieStore = await cookies()
            // Session cookie (no maxAge = expires when browser closes)
            cookieStore.set(COOKIE_NAME, "granted", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/"
            })

            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
