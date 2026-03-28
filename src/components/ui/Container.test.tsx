import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ContainerCard } from "@/components/ui/Container"

describe("ContainerCard", () => {
  it("renders children", () => {
    render(<ContainerCard>content</ContainerCard>)
    expect(screen.getByText("content")).toBeInTheDocument()
  })

  it("merges custom className with base styles", () => {
    render(<ContainerCard className="custom-class">content</ContainerCard>)
    expect(screen.getByText("content")).toHaveClass("custom-class")
  })
})
