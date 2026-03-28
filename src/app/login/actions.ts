"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"

import { signIn } from "@/lib/auth"

export async function handleLogin() {
  try {
    await signIn("github", { redirectTo: "/dashboard" })
  } catch (error) {
    if (isRedirectError(error)) throw error
    return { error: "Failed to login" }
  }
}
