import { AuthenticationError } from "@/lib/errors"
import { auth } from "@/lib/auth"

export async function getSessionUserId(): Promise<string> {
  const session = await auth()
  if (!session?.user?.id) throw new AuthenticationError("Unauthorized")
  return session.user.id
}
