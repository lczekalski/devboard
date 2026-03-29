import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import { Button } from "@/components/ui/Button"

describe("Button", () => {
  it("renders the children", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toHaveTextContent("Click me")
  })

  it("blocks interaction when disabled", () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("calls the onClick handler when clicked", () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalled()
  })

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>,
    )
    fireEvent.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })

  it.each(["default", "outline", "secondary", "ghost", "destructive", "link"] as const)(
    "renders variant %s without crashing",
    (variant) => {
      render(<Button variant={variant}>Click me</Button>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    },
  )

  it.each(["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"] as const)(
    "renders size %s without crashing",
    (size) => {
      render(<Button size={size}>x</Button>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    },
  )

  it("renders with type submit", () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit")
  })
})
