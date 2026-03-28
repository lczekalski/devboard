import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { StatCard } from "@/components/ui/StatCard"

describe("StatCard", () => {
  it("renders the label", () => {
    render(<StatCard label="Total repositories" value="42" />)
    expect(screen.getByText("Total repositories")).toBeInTheDocument()
  })

  it("renders the value", () => {
    render(<StatCard label="Total repositories" value="42" />)
    expect(screen.getByText("42")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<StatCard label="Label" value="0" className="flex-1" />)
    expect(container.firstChild).toHaveClass("flex-1")
  })
})
