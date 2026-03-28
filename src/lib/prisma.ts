import { PrismaClient } from "@prisma/client"

// globalThis has no typed index — assertion is necessary to attach prisma as a named property
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
