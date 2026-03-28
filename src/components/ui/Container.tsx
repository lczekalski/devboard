import { cn } from "@/lib/utils"

interface ContainerCardProps {
  children: React.ReactNode
  className?: string
}

export function ContainerCard({ children, className }: ContainerCardProps) {
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
