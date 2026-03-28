import { prisma } from "@/lib/prisma"

export async function getUserGitHubAccount(
  userId: string,
): Promise<{ access_token: string | null } | null> {
  const account = await prisma.account.findFirst({
    where: {
      userId,
      provider: "github",
    },
    select: {
      access_token: true,
    },
  })
  return account
}
