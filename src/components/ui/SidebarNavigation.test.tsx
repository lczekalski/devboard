import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { SidebarNavigation } from "@/components/ui/SidebarNavigation"

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

describe("SidebarNavigation", () => {
  it("renders the sidebar with 2 links", () => {
    render(<SidebarNavigation />)
    expect(screen.getAllByRole("link")).toHaveLength(2)
  })

  it("renders dashboard link with correct href", () => {
    render(<SidebarNavigation />)
    expect(screen.getByRole("link", { name: /dashboard/i })).toHaveAttribute("href", "/dashboard")
  })

  it("renders learning items link with correct href", () => {
    render(<SidebarNavigation />)
    expect(screen.getByRole("link", { name: /learning items/i })).toHaveAttribute(
      "href",
      "/learning-items",
    )
  })

  it("renders dashboard link text", () => {
    render(<SidebarNavigation />)
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })

  it("renders learning items link text", () => {
    render(<SidebarNavigation />)
    expect(screen.getByText("Learning Items")).toBeInTheDocument()
  })
})
