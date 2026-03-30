import { beforeEach, describe, expect, it, vi } from "vitest"

import {
  addLearningItem,
  removeLearningItem,
  toggleLearningItemStatus,
} from "@/app/(dashboard)/learning-items/actions"
import {
  createLearningItem,
  deleteLearningItem,
  updateLearningItemStatus,
} from "@/lib/repositories/learningItems"
import { getSessionUserId } from "@/lib/helpers/user"

vi.mock("@/lib/repositories/learningItems", () => ({
  createLearningItem: vi.fn(),
  updateLearningItemStatus: vi.fn(),
  deleteLearningItem: vi.fn(),
}))
vi.mock("@/lib/helpers/user", () => ({
  getSessionUserId: vi.fn(),
}))

const mockCreateLearningItem = vi.mocked(createLearningItem)
const mockUpdateLearningItemStatus = vi.mocked(updateLearningItemStatus)
const mockDeleteLearningItem = vi.mocked(deleteLearningItem)

const mockGetSessionUserId = vi.mocked(getSessionUserId)

beforeEach(() => {
  vi.clearAllMocks()
  mockGetSessionUserId.mockResolvedValue("123")
})

describe("learning-items actions", () => {
  describe("addLearningItem", () => {
    it("should add a new learning item", async () => {
      mockCreateLearningItem.mockResolvedValue({
        id: "123",
        userId: "123",
        category: "Test Category",
        title: "Test Learning Item",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      const formData = { title: "Test Learning Item", category: "Test Category" }
      const result = await addLearningItem(formData)

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.title).toBe("Test Learning Item")
      expect(result.data?.category).toBe("Test Category")
      expect(mockCreateLearningItem).toHaveBeenCalledWith(
        "123",
        "Test Learning Item",
        "Test Category",
      )
    })
    it("should return an error if title is not provided", async () => {
      const formData = { title: "", category: "Test Category" }
      const result = await addLearningItem(formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe("Title and category are required")
      expect(mockCreateLearningItem).not.toHaveBeenCalled()
    })
    it("should return an error if category is not provided", async () => {
      const formData = { title: "Test Learning Item", category: "" }
      const result = await addLearningItem(formData)
      expect(result.success).toBe(false)
      expect(result.error).toBe("Title and category are required")
      expect(mockCreateLearningItem).not.toHaveBeenCalled()
    })
    it("should return an error if repository throws", async () => {
      mockCreateLearningItem.mockRejectedValue(new Error("DB error"))
      const formData = { title: "Test", category: "Cat" }
      const result = await addLearningItem(formData)
      expect(result.success).toBe(false)
      expect(result.error).toBe("DB error")
    })
  })
  describe("toggleLearningItemStatus", () => {
    it("should toggle the status of a learning item", async () => {
      mockUpdateLearningItemStatus.mockResolvedValue({
        id: "123",
        userId: "123",
        category: "Test Category",
        title: "Test Learning Item",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      const result = await toggleLearningItemStatus("123", true)
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.done).toBe(true)
      expect(mockUpdateLearningItemStatus).toHaveBeenCalledWith("123", "123", true)
    })
    it("should return an error if item ID is not provided", async () => {
      const result = await toggleLearningItemStatus("", true)
      expect(result.success).toBe(false)
      expect(result.error).toBe("Item ID is required")
    })
    it("should return an error if repository throws", async () => {
      mockUpdateLearningItemStatus.mockRejectedValue(new Error("DB error"))
      const result = await toggleLearningItemStatus("123", true)
      expect(result.success).toBe(false)
      expect(result.error).toBe("DB error")
    })
  })
  describe("removeLearningItem", () => {
    it("should remove a learning item", async () => {
      mockDeleteLearningItem.mockResolvedValue(undefined)
      const result = await removeLearningItem("123")
      expect(result.success).toBe(true)
      expect(mockDeleteLearningItem).toHaveBeenCalledWith("123", "123")
    })
    it("should return an error if item ID is not provided", async () => {
      const result = await removeLearningItem("")
      expect(result.success).toBe(false)
      expect(result.error).toBe("Item ID is required")
    })
    it("should return an error if repository throws", async () => {
      mockDeleteLearningItem.mockRejectedValue(new Error("DB error"))
      const result = await removeLearningItem("123")
      expect(result.success).toBe(false)
      expect(result.error).toBe("DB error")
    })
  })
})
