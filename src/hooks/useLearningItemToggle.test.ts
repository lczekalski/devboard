import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { LearningItem } from "@prisma/client"

import { toggleLearningItemStatus } from "@/app/(dashboard)/learning-items/actions"

import { useLearningItemToggle } from "./useLearningItemToggle"

const mockRefresh = vi.hoisted(() => vi.fn())

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}))

vi.mock("@/app/(dashboard)/learning-items/actions", () => ({
  toggleLearningItemStatus: vi.fn().mockResolvedValue({ success: true }),
}))

const mockToggleLearningItemStatus = vi.mocked(toggleLearningItemStatus)

const learningItems = [
  { id: "1", category: "Category 1", done: false },
  { id: "2", category: "Category 2", done: false },
  { id: "3", category: "Category 1", done: false },
] as LearningItem[]

describe("useLearningItemToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return same items at start", () => {
    const { result } = renderHook(() => useLearningItemToggle(learningItems))
    expect(result.current.optimisticItems).toEqual(learningItems)
  })
  it("should successfully toggle the status of a learning item to true", () => {
    const { result } = renderHook(() => useLearningItemToggle(learningItems))
    act(() => {
      result.current.handleToggle("1", false)
    })
    expect(result.current.optimisticItems).toEqual([
      { id: "1", category: "Category 1", done: true },
      { id: "2", category: "Category 2", done: false },
      { id: "3", category: "Category 1", done: false },
    ])
  })
  it("should successfully toggle the status of a learning item to false", () => {
    const { result } = renderHook(() => useLearningItemToggle(learningItems))
    act(() => {
      result.current.handleToggle("1", true)
    })
    expect(result.current.optimisticItems).toEqual([
      { id: "1", category: "Category 1", done: false },
      { id: "2", category: "Category 2", done: false },
      { id: "3", category: "Category 1", done: false },
    ])
  })
  it("should call toggleLearningItemStatus with the correct arguments", () => {
    const { result } = renderHook(() => useLearningItemToggle(learningItems))
    act(() => {
      result.current.handleToggle("1", false)
    })
    expect(mockToggleLearningItemStatus).toHaveBeenCalledWith("1", true)
  })
  it("should call router.refresh", async () => {
    const { result } = renderHook(() => useLearningItemToggle(learningItems))
    await act(async () => {
      result.current.handleToggle("1", false)
    })
    expect(mockRefresh).toHaveBeenCalled()
  })
})
