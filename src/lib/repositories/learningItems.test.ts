import { afterEach, describe, expect, it } from "vitest"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

import { prisma } from "@/lib/prisma"

import {
  createLearningItem,
  deleteLearningItem,
  getUserLearningItems,
  updateLearningItemStatus,
} from "./learningItems"

const createUser = async () => {
  return await prisma.user.create({
    data: {
      id: "123",
      name: "Test User",
      email: "test@test.com",
      image: "https://test.com/image.png",
    },
  })
}

afterEach(async () => {
  await prisma.learningItem.deleteMany()
  await prisma.timerSession.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()
})

describe("todos", () => {
  describe("getUserLearningItems", () => {
    it("should return empty learning items if no items are found", async () => {
      const user = await createUser()
      const todos = await getUserLearningItems(user.id)
      expect(todos).toEqual([])
    })
    it("should return learning items if items are found", async () => {
      const user = await createUser()
      await prisma.user.create({
        data: {
          id: "124",
          name: "Test User 2",
          email: "test2@test.com",
          image: "https://test.com/image.png",
        },
      })
      const learningItem1 = await prisma.learningItem.create({
        data: {
          title: "Test Learning Item",
          category: "Test Category",
          done: false,
          userId: "123",
        },
      })
      const learningItem2 = await prisma.learningItem.create({
        data: {
          title: "Test Learning Item",
          category: "Test Category",
          done: false,
          userId: "123",
        },
      })

      await prisma.learningItem.create({
        data: {
          title: "Test Learning Item",
          category: "Test Category",
          done: false,
          userId: "124",
        },
      })
      const learningItems = await getUserLearningItems(user.id)
      expect(learningItems).toEqual([learningItem1, learningItem2])
    })
  })
  describe("createLearningItem", () => {
    it("should create a new learning item", async () => {
      const user = await createUser()
      const learningItem = await createLearningItem(user.id, "Test Learning Item", "Test Category")
      expect(learningItem).toBeDefined()
      expect(learningItem.userId).toBe(user.id)
      expect(learningItem.title).toBe("Test Learning Item")
      expect(learningItem.category).toBe("Test Category")
      expect(learningItem.done).toBe(false)
    })
    it("should throw an error if the user is not found", async () => {
      await expect(
        createLearningItem("123", "Test Learning Item", "Test Category"),
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })
  })
  describe("updateLearningItemStatus", () => {
    it("should update the status of a learning item", async () => {
      const user = await createUser()
      const learningItem = await createLearningItem(user.id, "Test Learning Item", "Test Category")
      const updatedLearningItem = await updateLearningItemStatus(user.id, learningItem.id, true)
      expect(updatedLearningItem.done).toBe(true)
    })
    it("should throw an error if the learning item is not found", async () => {
      await expect(updateLearningItemStatus("123", "123", true)).rejects.toThrow(
        PrismaClientKnownRequestError,
      )
    })
    it("should throw an error if user doesn't own the learning item", async () => {
      const user = await createUser()
      const learningItem = await createLearningItem(user.id, "Test Learning Item", "Test Category")
      await expect(updateLearningItemStatus("125", learningItem.id, true)).rejects.toThrow(
        PrismaClientKnownRequestError,
      )
    })
  })
  describe("deleteLearningItem", () => {
    it("should delete a learning item", async () => {
      const user = await createUser()
      const learningItem = await createLearningItem(user.id, "Test Learning Item", "Test Category")
      await deleteLearningItem(user.id, learningItem.id)
      const learningItems = await getUserLearningItems(user.id)
      expect(learningItems).toEqual([])
    })
    it("should throw an error if the learning item is not found", async () => {
      await expect(deleteLearningItem("123", "123")).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it("should throw an error if user doesn't own the learning item", async () => {
      const user = await createUser()
      const learningItem = await createLearningItem(user.id, "Test Learning Item", "Test Category")
      await expect(deleteLearningItem("125", learningItem.id)).rejects.toThrow(
        PrismaClientKnownRequestError,
      )
    })
  })
})
