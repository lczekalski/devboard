import { User } from "@prisma/client"

import { prisma } from "@/lib/prisma"

export async function getUser(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  return user
}
