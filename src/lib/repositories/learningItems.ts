import { LearningItem } from "@prisma/client"

import { prisma } from "@/lib/prisma"

export async function getUserLearningItems(userId: string): Promise<LearningItem[]> {
  const learningItems = await prisma.learningItem.findMany({
    where: {
      userId: userId,
    },
  })
  return learningItems
}

export async function createLearningItem(
  userId: string,
  title: string,
  category: string,
): Promise<LearningItem> {
  const learningItem = await prisma.learningItem.create({
    data: {
      userId: userId,
      title: title,
      category: category,
    },
  })
  return learningItem
}

export async function updateLearningItemStatus(
  userId: string,
  itemId: string,
  status: boolean,
): Promise<LearningItem> {
  const learningItem = await prisma.learningItem.update({
    where: {
      id: itemId,
      userId: userId,
    },
    data: {
      done: status,
    },
  })
  return learningItem
}

export async function deleteLearningItem(userId: string, itemId: string): Promise<void> {
  await prisma.learningItem.delete({
    where: {
      id: itemId,
      userId: userId,
    },
  })
}
