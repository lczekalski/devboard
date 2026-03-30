import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/Button"
import { addLearningItem } from "@/app/(dashboard)/learning-items/actions"
import { FormErrorMessage } from "@/components/ui/forms/FormErrorMessage"

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.string().min(1, { message: "Category is required" }),
})

type AddLearningFormInputs = z.infer<typeof formSchema>

interface AddLearningItemFormProps {
  onSuccess: () => void
}

export function AddLearningItemForm({ onSuccess }: AddLearningItemFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLearningFormInputs>({
    resolver: zodResolver(formSchema),
  })

  const onSubmitForm: SubmitHandler<AddLearningFormInputs> = async (data) => {
    const result = await addLearningItem(data)
    if (result.success) {
      router.refresh()
      onSuccess()
    }
  }
  return (
    <div className="flex flex-col gap-1">
      <h1>New Learning Item</h1>
      <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5 flex flex-col gap-4">
        <div>
          <input
            {...register("title")}
            className="w-full rounded-md bg-surface-card p-2 text-accent-foreground"
          />
          {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
        </div>
        <div>
          <input
            {...register("category")}
            className="w-full rounded-md bg-surface-card p-2 text-accent-foreground"
          />
          {errors.category && <FormErrorMessage>{errors.category.message}</FormErrorMessage>}
        </div>
        <Button type="submit">Add Learning Item</Button>
      </form>
    </div>
  )
}
