export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
  pushed_at: string | null
}

export interface GitHubUser {
  login: string
  public_repos: number
  followers: number
  following: number
}
