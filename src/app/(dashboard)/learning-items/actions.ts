"use server"

import { LearningItem } from "@prisma/client"

import { getSessionUserId } from "@/lib/helpers/user"
import {
  createLearningItem,
  deleteLearningItem,
  updateLearningItemStatus,
} from "@/lib/repositories/learningItems"
import { ActionResult } from "@/types/actions"

export async function addLearningItem(data: {
  title: string
  category: string
}): Promise<ActionResult<LearningItem>> {
  const title = data.title.trim()
  const category = data.category.trim()

  if (title === "" || category === "") {
    return { success: false, error: "Title and category are required" }
  }
  try {
    const userId = await getSessionUserId()
    const learningItem = await createLearningItem(userId, title, category)
    return { success: true, data: learningItem }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function toggleLearningItemStatus(
  itemId: string,
  status: boolean,
): Promise<ActionResult<LearningItem>> {
  if (!itemId) {
    return { success: false, error: "Item ID is required" }
  }
  try {
    const userId = await getSessionUserId()
    const learningItem = await updateLearningItemStatus(userId, itemId, status)
    return { success: true, data: learningItem }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function removeLearningItem(itemId: string): Promise<ActionResult<void>> {
  if (!itemId) {
    return { success: false, error: "Item ID is required" }
  }
  try {
    const userId = await getSessionUserId()
    await deleteLearningItem(userId, itemId)
    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
