import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdmin = nextUrl.pathname.startsWith('/admin')
            const isLoginPage = nextUrl.pathname === '/admin/login'

            if (isOnAdmin && !isLoginPage) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string
                session.user.id = token.id as string
            }
            return session
        },
    },
    providers: [], // Add providers with an empty array for now
    session: {
        maxAge: 900, // 15 minutes
    },
} satisfies NextAuthConfig
