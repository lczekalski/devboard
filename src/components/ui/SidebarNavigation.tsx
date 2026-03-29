"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard } from "lucide-react"
import { TbChecklist } from "react-icons/tb"

import { cn } from "@/lib/utils"

interface NavigationLinkProps {
  isActive: boolean
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}

function NavigationLink({ isActive, href, icon, children }: NavigationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row items-center gap-2 text-sm text-text-muted-1 transition-colors hover:text-text-primary",
        isActive && "text-text-primary",
      )}
    >
      {icon} {children}
    </Link>
  )
}

export function SidebarNavigation() {
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-2">
      <NavigationLink
        isActive={pathname === "/dashboard"}
        href="/dashboard"
        icon={<LayoutDashboard className="size-4" />}
      >
        Dashboard
      </NavigationLink>
      <NavigationLink
        isActive={pathname === "/todos"}
        href="/todos"
        icon={<TbChecklist className="size-4" />}
      >
        Todos
      </NavigationLink>
    </div>
  )
}
