"use server"

import { isRedirectError } from "next/navigation"

import { signIn } from "@/lib/auth"

export async function handleLogin(): Promise<void> {
  try {
    await signIn("github", { redirectTo: "/dashboard" })
  } catch (error) {
    throw error
  }
}
