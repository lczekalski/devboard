import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import Login from "@/app/login/page"

vi.mock("@/app/login/actions", () => ({
  handleLogin: vi.fn(),
}))

describe("Login", () => {
  it("renders the app title", () => {
    render(<Login />)
    expect(screen.getByRole("heading", { name: "DevBoard" })).toBeInTheDocument()
  })

  it("renders the login with github button", () => {
    render(<Login />)
    expect(screen.getByRole("button", { name: /login with github/i })).toBeInTheDocument()
  })

  it("renders the submit button", () => {
    render(<Login />)
    expect(screen.getByRole("button", { name: /login with github/i })).toHaveAttribute("type", "submit")
  })
})
