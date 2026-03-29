import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"

export const authConfig: NextAuthConfig = {
  providers: [GitHub],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // token.sub is automatically set to user.id by Auth.js — copy it to session
    session({ session, token }) {
      session.user.id = token.sub!
      return session
    },
  },
}
