import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const SITE_PASSWORD = process.env.SITE_PASSWORD || "SICA2026"
const COOKIE_NAME = "site_access"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function POST(request: Request) {
    try {
        const { password } = await request.json()

        if (password === SITE_PASSWORD) {
            const cookieStore = await cookies()
            cookieStore.set(COOKIE_NAME, "granted", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: COOKIE_MAX_AGE,
                path: "/"
            })

            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
