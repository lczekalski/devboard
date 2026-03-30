import { LearningItem } from "@prisma/client"
import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"

import { toggleLearningItemStatus } from "@/app/(dashboard)/learning-items/actions"

export function useLearningItemToggle(learningItems: LearningItem[]) {
  const router = useRouter()
  const [optimisticItems, updateOptimistic] = useOptimistic(
    learningItems,
    (state, { id, done }: { id: string; done: boolean }) =>
      state.map((item) => (item.id === id ? { ...item, done } : item)),
  )
  const [, startTransition] = useTransition()

  function handleToggle(id: string, currentDone: boolean) {
    startTransition(async () => {
      updateOptimistic({ id, done: !currentDone })
      await toggleLearningItemStatus(id, !currentDone)
      router.refresh()
    })
  }
  return { optimisticItems, handleToggle }
}
