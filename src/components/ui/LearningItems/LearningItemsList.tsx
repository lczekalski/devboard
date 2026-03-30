"use client"

import { LearningItem } from "@prisma/client"

import { cn } from "@/lib/utils"
import { useLearningItemToggle } from "@/hooks/useLearningItemToggle"
import { useLearningItemsFilter } from "@/hooks/useLearningItemsFilter"

export interface LearningItemsListProps {
  learningItems: LearningItem[]
}
export function LearningItemsList({ learningItems }: LearningItemsListProps) {
  const { filteredLearningItems, categoriesWithCount, setCategoryFilter, categoryFilter } =
    useLearningItemsFilter(learningItems)

  return (
    <div className="flex flex-row gap-10">
      <LearningItemsCategories
        allCount={learningItems.length}
        categories={categoriesWithCount}
        onCategoryFilterChange={setCategoryFilter}
        categoryFilter={categoryFilter}
      />
      <LearningItemsListItems learningItems={filteredLearningItems} />
    </div>
  )
}

interface LearningItemsCategoriesProps {
  categories: { id: string; name: string; count: number }[]
  onCategoryFilterChange: (category: string) => void
  categoryFilter: string | null
  allCount: number
}

function LearningItemsCategories({
  categories,
  onCategoryFilterChange,
  categoryFilter,
  allCount,
}: LearningItemsCategoriesProps) {
  return (
    <div className="flex w-40 flex-col gap-2">
      <CategoryItem
        name="All"
        count={allCount}
        onCategoryFilterChange={onCategoryFilterChange}
        categoryFilter={categoryFilter}
      />
      {categories.map((category) => (
        <CategoryItem
          key={category.name}
          name={category.name}
          count={category.count}
          onCategoryFilterChange={onCategoryFilterChange}
          categoryFilter={categoryFilter}
        />
      ))}
    </div>
  )
}

interface CategoryItemProps {
  name: string
  count: number
  onCategoryFilterChange: (category: string) => void
  categoryFilter: string | null
}

function CategoryItem({ name, count, onCategoryFilterChange, categoryFilter }: CategoryItemProps) {
  const isActive = categoryFilter === name
  return (
    <button
      onClick={() => onCategoryFilterChange(name)}
      className={cn(
        "flex w-full cursor-pointer flex-row items-center justify-between rounded-md p-2 text-sm font-medium",
        isActive ? "bg-accent text-accent-foreground" : "bg-surface-card text-accent-foreground",
      )}
    >
      {name}
      <span
        className={cn(
          "rounded-md px-2 py-1 text-xs font-bold",
          isActive
            ? "text-accent-background bg-accent-light"
            : "bg-accent-dim text-accent-foreground",
        )}
      >
        {count}
      </span>
    </button>
  )
}

interface LearningItemsListItemsProps {
  learningItems: LearningItem[]
}

function LearningItemsListItems({ learningItems }: LearningItemsListItemsProps) {
  const { optimisticItems, handleToggle } = useLearningItemToggle(learningItems)
  const totalProgress = optimisticItems.filter((item) => item.done).length
  const totalProgressPercentage = (totalProgress / optimisticItems.length) * 100
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-4 rounded-md bg-surface-card p-2 text-xs font-medium text-text-muted-3">
        <div className="flex w-full flex-row items-center justify-between">
          Total progress:{" "}
          <span className="text-accent">
            {optimisticItems.filter((item) => item.done).length} / {optimisticItems.length}
          </span>
        </div>
        <div className="h-3 w-full rounded-md bg-accent-dim">
          <div
            className="h-full rounded-md bg-accent"
            style={{ width: `${totalProgressPercentage}%` }}
          ></div>
        </div>
      </div>
      {optimisticItems.map((item) => (
        <div
          key={item.id}
          className="flex w-full flex-row items-center justify-start gap-4 rounded-md bg-surface-card p-2 text-accent-foreground"
        >
          <input
            type="checkbox"
            id={item.id}
            checked={item.done}
            onChange={() => handleToggle(item.id, item.done)}
          />
          <span
            className={cn(
              "text-sm font-medium",
              item.done ? "text-text-muted-3 line-through" : "text-accent-foreground",
            )}
          >
            {item.title}
          </span>
        </div>
      ))}
    </div>
  )
}
