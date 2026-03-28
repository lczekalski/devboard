import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { RepositoryCard } from "@/components/ui/RepositoryCard"

const repository = {
  id: 1,
  name: "Test Repository",
  description: "Test Description",
  language: "Test Language",
  stargazers_count: 10,
  full_name: "Test Repository",
  html_url: "https://github.com/test/test",
  pushed_at: new Date().toISOString(),
}

describe("RepositoryCard", () => {
  it("renders the repository name", () => {
    render(<RepositoryCard repository={repository} />)
    expect(screen.getByText(repository.name)).toBeInTheDocument()
  })
  it("renders the repository description", () => {
    render(<RepositoryCard repository={repository} />)
    expect(screen.getByText(repository.description ?? "")).toBeInTheDocument()
  })
  it("renders the repository language", () => {
    render(<RepositoryCard repository={repository} />)
    expect(screen.getByText(repository.language ?? "")).toBeInTheDocument()
  })
  it("renders the repository stargazers count", () => {
    render(<RepositoryCard repository={repository} />)
    expect(screen.getByText(repository.stargazers_count.toString())).toBeInTheDocument()
  })
  it("renders Unknown if the language is null", () => {
    const repository = {
      id: 1,
      name: "Test Repository",
      description: "Test Description",
      language: null,
      stargazers_count: 10,
      full_name: "Test Repository",
      html_url: "https://github.com/test/test",
      pushed_at: new Date().toISOString(),
    }
    render(<RepositoryCard repository={repository} />)
    expect(screen.getByText("Unknown")).toBeInTheDocument()
  })
  it("renders Unknown if language is empty", () => {
    const repository = {
      id: 1,
      name: "Test Repository",
      description: "Test Description",
      language: "",
      stargazers_count: 10,
      full_name: "Test Repository",
      html_url: "https://github.com/test/test",
      pushed_at: new Date().toISOString(),
    }
    render(<RepositoryCard repository={repository} />)
    expect(screen.getByText("Unknown")).toBeInTheDocument()
  })
})
