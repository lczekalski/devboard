import { User } from "next-auth"
import { useSession } from "next-auth/react"

export function useUser(): User | null {
  const { data: session } = useSession()
  const user = session?.user
  return user ?? null
}
