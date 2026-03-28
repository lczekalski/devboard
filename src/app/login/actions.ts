"use server"

import { signIn } from "@/lib/auth"

export async function handleLogin(): Promise<void> {
  await signIn("github", { redirectTo: "/dashboard" })
}
