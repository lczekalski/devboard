interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <p className="text-sm text-text-muted-1">{description}</p>}
    </div>
  )
}

interface PageDescriptionProps {
  description: string
}
export function PageDescription({ description }: PageDescriptionProps) {
  return <p className="text-sm text-text-muted-1">{description}</p>
}
