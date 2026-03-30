import Image from "next/image"

import { SidebarNavigation } from "@/components/ui/SidebarNavigation"
import { Logo } from "@/components/ui/Logo"
import { auth } from "@/lib/auth"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user = session?.user
  return (
    <div className="m-2 flex h-[var(--layout-shell-height)] w-[var(--layout-shell-width)] flex-row rounded-2xl border border-surface-subtle">
      <aside className="flex h-[var(--sidebar-height)] w-[var(--sidebar-width)] flex-col rounded-l-2xl bg-sidebar py-3.5">
        <div className="px-3.5">
          <Logo />
        </div>
        <div className="my-4 border-b border-surface-subtle"></div>
        <div className="flex-1 px-3.5">
          <SidebarNavigation />
        </div>
        <div className="my-4 border-b border-surface-subtle"></div>
        <div className="flex flex-row items-center gap-2 px-3.5">
          {user?.image && (
            <Image
              src={user.image}
              alt={user.name || ""}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <p>{user?.name}</p>
        </div>
      </aside>
      <main className="flex-1 rounded-r-2xl bg-surface-app p-5">{children}</main>
    </div>
  )
}
