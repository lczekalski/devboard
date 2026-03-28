import { cn } from "@/lib/utils"

export function ContainerCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-start rounded-lg border border-surface-subtle bg-surface-card p-4",
        className,
      )}
    >
      {children}
    </div>
  )
}
