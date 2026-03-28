import { redirect } from "next/navigation"

import { PageHeader } from "@/components/ui/Typography"
import { StatCard } from "@/components/ui/StatCard"
import { RepositoryCard } from "@/components/ui/RepositoryCard"
import { auth } from "@/lib/auth"
import { getGithubUser, getRecentlyUpdatedRepositories } from "@/lib/repositories/github"
import { getUserGitHubAccount } from "@/lib/repositories/accounts"
import { AuthenticationError } from "@/lib/errors"

export default async function Dashboard() {
  const session = await auth()

  try {
    if (!session?.user?.id) throw new AuthenticationError("Unauthorized")

    const githubAccount = await getUserGitHubAccount(session.user.id)
    const accessToken = githubAccount?.access_token
    if (!accessToken) throw new AuthenticationError("Unauthorized")
    const [githubUser, repositories] = await Promise.all([
      getGithubUser(accessToken),
      getRecentlyUpdatedRepositories(accessToken),
    ])
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <PageHeader title="Dashboard" description="Dashboard description" />
        </div>
        <div className="flex flex-row gap-2">
          <StatCard
            label="Total repositories"
            value={repositories.length.toString()}
            className="flex-1"
          />
          <StatCard
            label="Total followers"
            value={githubUser.followers.toString()}
            className="flex-1"
          />
          <StatCard
            label="Total following"
            value={githubUser.following.toString()}
            className="flex-1"
          />
          <StatCard
            label="Total stars"
            value={repositories.reduce((acc, repo) => acc + repo.stargazers_count, 0).toString()}
            className="flex-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      </div>
    )
  } catch (error) {
    if (error instanceof AuthenticationError) {
      redirect("/login")
    }
    throw error
  }
}
