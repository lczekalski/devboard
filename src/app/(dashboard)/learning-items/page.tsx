import { redirect } from "next/navigation"

import { AddLearningItemDialog } from "@/components/ui/LearningItems/AddLearningItemDialog"
import { LearningItemsList } from "@/components/ui/LearningItems/LearningItemsList"
import { PageHeader } from "@/components/ui/Typography"
import { AuthenticationError } from "@/lib/errors"
import { getSessionUserId } from "@/lib/helpers/user"
import { getUserLearningItems } from "@/lib/repositories/learningItems"

export default async function LearningItems() {
  let learningItems: Awaited<ReturnType<typeof getUserLearningItems>>

  try {
    const userId = await getSessionUserId()
    learningItems = await getUserLearningItems(userId)
  } catch (error) {
    if (error instanceof AuthenticationError) redirect("/login")
    throw error
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <PageHeader title="Learning Items" description="Your learning items" />
        <AddLearningItemDialog />
      </div>
      <LearningItemsList learningItems={learningItems} />
    </div>
  )
}
