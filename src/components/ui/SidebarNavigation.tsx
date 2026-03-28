import Link from "next/link"
import { LayoutDashboard } from "lucide-react"
import { TbChecklist } from "react-icons/tb"

import { cn } from "@/lib/utils"

export function SidebarNavigation() {
  return (
    <div className="flex flex-col gap-2">
      <NavigationLink href="/dashboard" icon={<LayoutDashboard className="size-4" />}>
        Dashboard
      </NavigationLink>
      <NavigationLink href="/todos" icon={<TbChecklist className="size-4" />}>
        Todos
      </NavigationLink>
    </div>
  )
}

function NavigationLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row items-center gap-2 text-sm text-text-muted-1 transition-colors hover:text-text-primary",
      )}
    >
      {icon} {children}
    </Link>
  )
}
