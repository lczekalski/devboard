import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest"

import Dashboard from "@/app/(dashboard)/dashboard/page"
import { auth } from "@/lib/auth"
import { getUserGitHubAccount } from "@/lib/repositories/accounts"
import { getGithubUser, getRecentlyUpdatedRepositories } from "@/lib/repositories/github"
import type { GitHubRepo, GitHubUser } from "@/types/github"

vi.mock("@/lib/auth", () => ({ auth: vi.fn() }))
vi.mock("@/lib/repositories/accounts", () => ({ getUserGitHubAccount: vi.fn() }))
vi.mock("@/lib/repositories/github", () => ({
  getGithubUser: vi.fn(),
  getRecentlyUpdatedRepositories: vi.fn(),
}))
vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

const mockAuth = vi.mocked(auth) as Mock
const mockGetUserGitHubAccount = vi.mocked(getUserGitHubAccount) as Mock
const mockGetGithubUser = vi.mocked(getGithubUser) as Mock
const mockGetRecentlyUpdatedRepositories = vi.mocked(getRecentlyUpdatedRepositories) as Mock

const mockSession = { user: { id: "user-1", name: "Test User", email: "test@example.com" } }

const mockGithubUser: GitHubUser = {
  login: "testuser",
  public_repos: 10,
  followers: 42,
  following: 7,
}

const mockRepo: GitHubRepo = {
  id: 1,
  name: "my-repo",
  full_name: "testuser/my-repo",
  html_url: "https://github.com/testuser/my-repo",
  description: "A test repo",
  stargazers_count: 5,
  language: "TypeScript",
  pushed_at: "2024-01-01T00:00:00Z",
}

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetUserGitHubAccount.mockResolvedValue({ access_token: "token-123" })
    mockGetGithubUser.mockResolvedValue(mockGithubUser)
    mockGetRecentlyUpdatedRepositories.mockResolvedValue([mockRepo])
  })

  it("renders stat cards when authenticated", async () => {
    mockAuth.mockResolvedValue(mockSession)

    render(await Dashboard())

    expect(screen.getByText("Total repositories")).toBeInTheDocument()
    expect(screen.getByText("Total followers")).toBeInTheDocument()
    expect(screen.getByText("Total following")).toBeInTheDocument()
    expect(screen.getByText("Total stars")).toBeInTheDocument()
  })

  it("renders correct stat values for repos, followers and following", async () => {
    mockAuth.mockResolvedValue(mockSession)

    render(await Dashboard())

    // "1", "42", "7" are unique — they don't appear in RepositoryCard
    expect(screen.getByText("1")).toBeInTheDocument() // repositories.length
    expect(screen.getByText("42")).toBeInTheDocument() // followers
    expect(screen.getByText("7")).toBeInTheDocument() // following
  })

  it("renders repository cards", async () => {
    mockAuth.mockResolvedValue(mockSession)

    render(await Dashboard())

    expect(screen.getByText("my-repo")).toBeInTheDocument()
  })

  it("redirects to /login when there is no session", async () => {
    const { redirect } = await import("next/navigation")
    mockAuth.mockResolvedValue(null)

    // redirect() is mocked so execution continues to `throw error`
    await expect(Dashboard()).rejects.toThrow()
    expect(redirect).toHaveBeenCalledWith("/login")
  })

  it("redirects to /login when GitHub account has no access token", async () => {
    const { redirect } = await import("next/navigation")
    mockAuth.mockResolvedValue(mockSession)
    mockGetUserGitHubAccount.mockResolvedValue({ access_token: null })

    await expect(Dashboard()).rejects.toThrow()
    expect(redirect).toHaveBeenCalledWith("/login")
  })

  it("redirects to /login when GitHub account does not exist", async () => {
    const { redirect } = await import("next/navigation")
    mockAuth.mockResolvedValue(mockSession)
    mockGetUserGitHubAccount.mockResolvedValue(null)

    await expect(Dashboard()).rejects.toThrow()
    expect(redirect).toHaveBeenCalledWith("/login")
  })

  it("rethrows non-authentication errors", async () => {
    mockAuth.mockResolvedValue(mockSession)
    mockGetGithubUser.mockRejectedValue(new Error("GitHub API error: 500"))

    await expect(Dashboard()).rejects.toThrow("GitHub API error: 500")
  })
})
