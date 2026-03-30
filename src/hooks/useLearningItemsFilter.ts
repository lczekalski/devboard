import { LearningItem } from "@prisma/client"
import { useMemo, useState } from "react"

export function useLearningItemsFilter(learningItems: LearningItem[]) {
  const [categoryFilter, setCategoryFilter] = useState<string>("All")
  const filteredLearningItems = useMemo(() => {
    return learningItems.filter((item) =>
      categoryFilter !== "All" ? item.category === categoryFilter : true,
    )
  }, [learningItems, categoryFilter])

  const categories = useMemo(() => {
    return [...new Set(learningItems.map((item) => item.category))]
  }, [learningItems])

  const categoriesWithCount = useMemo(() => {
    return categories.map((category) => ({
      id: category,
      name: category,
      count: learningItems.filter((item) => item.category === category).length,
    }))
  }, [categories, learningItems])

  return { filteredLearningItems, categoriesWithCount, setCategoryFilter, categoryFilter }
}
