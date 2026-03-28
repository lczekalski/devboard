import { GitHubRepo, GitHubUser } from "@/types/github"

const BASE_URL = "https://api.github.com"

async function githubFetch<T extends object>(path: string, accessToken: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    },
  })

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  // res.json() returns Promise<unknown> — assertion is necessary as fetch has no generic overload
  return res.json() as Promise<T>
}

export async function getRecentlyUpdatedRepositories(accessToken: string): Promise<GitHubRepo[]> {
  return githubFetch<GitHubRepo[]>(
    "/user/repos?sort=pushed&direction=desc&per_page=10",
    accessToken,
  )
}

export async function getGithubUser(accessToken: string): Promise<GitHubUser> {
  return githubFetch<GitHubUser>("/user", accessToken)
}
