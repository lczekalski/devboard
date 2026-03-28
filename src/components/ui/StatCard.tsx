import { cn } from "@/lib/utils"
import { ContainerCard } from "@/components/ui/Container"

interface StatCardProps {
  label: string
  value: string
  className?: string
}

export function StatCard({ label, value, className }: StatCardProps) {
  return (
    <ContainerCard className={cn("flex flex-col items-center justify-center", className)}>
      <p className="text-sm text-text-muted-1">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </ContainerCard>
  )
}
