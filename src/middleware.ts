import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const SITE_ACCESS_COOKIE = "site_access"

// Public paths that don't require site password
const publicPaths = [
    "/password",
    "/api/auth/site-password",
    "/api/auth",
    "/_next",
    "/favicon.ico",
]

// Check if path is public (doesn't need site password)
function isPublicPath(pathname: string): boolean {
    return publicPaths.some(path => pathname.startsWith(path)) ||
        pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)$/) !== null
}

// Check if path is admin area (needs NextAuth)
function isAdminPath(pathname: string): boolean {
    return pathname.startsWith("/admin")
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip site password check for public paths
    if (isPublicPath(pathname)) {
        return NextResponse.next()
    }

    // Check for site access cookie
    const siteAccess = request.cookies.get(SITE_ACCESS_COOKIE)

    if (!siteAccess || siteAccess.value !== "granted") {
        // Redirect to password page
        const passwordUrl = new URL("/password", request.url)
        return NextResponse.redirect(passwordUrl)
    }

    // For admin paths, use NextAuth middleware
    if (isAdminPath(pathname) && pathname !== "/admin/login") {
        const auth = NextAuth(authConfig).auth
        // @ts-ignore - NextAuth types are complex
        return auth(request)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
}
