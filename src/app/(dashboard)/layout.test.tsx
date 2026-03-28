/* eslint-disable @next/next/no-img-element */
import type { Session } from "next-auth"
import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest"

import DashboardLayout from "@/app/(dashboard)/layout"
import { auth } from "@/lib/auth"

vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
}))

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

// vi.mocked returns a wider type than Mock — assertion is necessary to access mockResolvedValue with correct signature
const mockAuth = vi.mocked(auth) as Mock<() => Promise<Session | null>>

describe("DashboardLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders sidebar and main content area", async () => {
    mockAuth.mockResolvedValue(null)

    render(await DashboardLayout({ children: <div>page content</div> }))

    expect(screen.getByRole("complementary")).toBeInTheDocument()
    expect(screen.getByRole("main")).toBeInTheDocument()
    expect(screen.getByText("page content")).toBeInTheDocument()
  })

  it("renders without crashing when there is no session", async () => {
    mockAuth.mockResolvedValue(null)

    render(await DashboardLayout({ children: <div /> }))

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
    expect(screen.getByRole("main")).toBeInTheDocument()
  })

  it("shows user name when authenticated", async () => {
    mockAuth.mockResolvedValue({
      user: { name: "Test User", email: "test@example.com", image: null },
      expires: "2099-01-01",
    })

    render(await DashboardLayout({ children: <div /> }))

    expect(screen.getByText("Test User")).toBeInTheDocument()
  })

  it("shows avatar when user has an image", async () => {
    const imageUrl = "https://avatars.githubusercontent.com/test"
    mockAuth.mockResolvedValue({
      user: { name: "Test User", email: "test@example.com", image: imageUrl },
      expires: "2099-01-01",
    })

    render(await DashboardLayout({ children: <div /> }))

    const avatar = screen.getByRole("img", { name: "Test User" })
    expect(avatar).toHaveAttribute("src", imageUrl)
  })

  it("hides avatar when user has no image", async () => {
    mockAuth.mockResolvedValue({
      user: { name: "Test User", email: "test@example.com", image: null },
      expires: "2099-01-01",
    })

    render(await DashboardLayout({ children: <div /> }))

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })
})
