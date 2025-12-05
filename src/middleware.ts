import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export default NextAuth(authConfig).auth

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    // Exclude /api/auth (NextAuth routes) from middleware to avoid callback errors
    matcher: ['/((?!api/auth|api|_next/static|_next/image|.*\\.png$).*)'],
};
