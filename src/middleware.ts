import NextAuth from "next-auth"

import { authConfig } from "@/lib/auth.config"

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  // Protect all routes except auth, static files and login page
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|login$).*)"],
}
