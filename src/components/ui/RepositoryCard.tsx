import { BsCircleFill } from "react-icons/bs"
import { FaStar } from "react-icons/fa"

import { GitHubRepo } from "@/types/github"
import { ContainerCard } from "@/components/ui/Container"

interface RepositoryCardProps {
    repository: GitHubRepo
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
    const language = repository.language || "Unknown"
    return (
        <ContainerCard className="flex flex-col items-start justify-center">
            <span className="text-sm font-bold">{repository.name}</span>
            <span className="text-xs text-text-muted-1">{repository.description}</span>
            <div className="mt-4 flex flex-row justify-start gap-2">
                <span className="flex flex-row gap-2 text-xs text-text-muted-1">
                    <BsCircleFill className="size-4 text-accent" /> {language}
                </span>
                <span className="flex flex-row gap-2 text-xs text-text-muted-1">
                    <FaStar className="size-4 text-primary" /> {repository.stargazers_count}
                </span>
            </div>
        </ContainerCard>
    )
}
