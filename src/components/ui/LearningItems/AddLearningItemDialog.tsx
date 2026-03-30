"use client"

import { useState } from "react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { AddLearningItemForm } from "@/components/ui/LearningItems/AddLearningItemForm"

export function AddLearningItemDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Add Learning Item</DialogTrigger>
      <DialogContent>
        <AddLearningItemForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
