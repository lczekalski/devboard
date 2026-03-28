import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Logo } from "@/components/ui/Logo"

describe("Logo", () => {
  it("renders Dev and Board text", () => {
    render(<Logo />)
    expect(screen.getByText("Dev")).toBeInTheDocument()
    expect(screen.getByText("Board")).toBeInTheDocument()
  })
})
