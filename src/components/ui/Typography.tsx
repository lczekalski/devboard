export function PageHeader({ title }: { title: string }) {
  return <h1 className="text-2xl font-bold">{title}</h1>
}

export function PageDescription({ description }: { description: string }) {
  return <p className="text-sm text-text-muted-1">{description}</p>
}
