import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { PageHeader, PageDescription } from "@/components/ui/Typography"

describe("PageHeader", () => {
  it("renders the title", () => {
    render(<PageHeader title="Dashboard" />)
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument()
  })

  it("renders the description when provided", () => {
    render(<PageHeader title="Dashboard" description="Your overview" />)
    expect(screen.getByText("Your overview")).toBeInTheDocument()
  })

  it("does not render description when omitted", () => {
    render(<PageHeader title="Dashboard" />)
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument()
  })
})

describe("PageDescription", () => {
  it("renders the description text", () => {
    render(<PageDescription description="Some description" />)
    expect(screen.getByText("Some description")).toBeInTheDocument()
  })
})
