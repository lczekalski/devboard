import { describe, expect, it } from "vitest"
import { LearningItem } from "@prisma/client"
import { renderHook } from "@testing-library/react"
import { act } from "react"

import { useLearningItemsFilter } from "./useLearningItemsFilter"

const learningItems = [
  { id: "1", category: "Category 1" },
  { id: "2", category: "Category 2" },
  { id: "3", category: "Category 1" },
] as LearningItem[]

describe("useLearningItemsFilter", () => {
  it("should return all learning items by default", () => {
    const { result } = renderHook(() => useLearningItemsFilter(learningItems))
    expect(result.current.filteredLearningItems).toEqual([
      { id: "1", category: "Category 1" },
      { id: "2", category: "Category 2" },
      { id: "3", category: "Category 1" },
    ])
  })
  it("should return categories with count", () => {
    const { result } = renderHook(() => useLearningItemsFilter(learningItems))
    expect(result.current.categoriesWithCount).toEqual([
      { id: "Category 1", name: "Category 1", count: 2 },
      { id: "Category 2", name: "Category 2", count: 1 },
    ])
  })
  it("should filter learning items by category", () => {
    const { result } = renderHook(() => useLearningItemsFilter(learningItems))
    act(() => {
      result.current.setCategoryFilter("Category 1")
    })
    expect(result.current.filteredLearningItems).toEqual([
      { id: "1", category: "Category 1" },
      { id: "3", category: "Category 1" },
    ])
  })
  it("should return selected category filter", () => {
    const { result } = renderHook(() => useLearningItemsFilter(learningItems))
    act(() => {
      result.current.setCategoryFilter("Category 1")
    })
    expect(result.current.categoryFilter).toEqual("Category 1")
  })
  it("should return all categories when category filter is 'All'", () => {
    const { result } = renderHook(() => useLearningItemsFilter(learningItems))

    act(() => {
      result.current.setCategoryFilter("All")
    })
    expect(result.current.filteredLearningItems).toEqual([
      { id: "1", category: "Category 1" },
      { id: "2", category: "Category 2" },
      { id: "3", category: "Category 1" },
    ])
  })
})
