import { FaGithub } from "react-icons/fa"

import { Button } from "@/components/ui/Button"
import { ContainerCard } from "@/components/ui/Container"

import { handleLogin } from "./actions"

export default function Login() {
  return (
    <div className="mx-auto flex h-full flex-col items-center justify-center">
      <ContainerCard className="h-64 w-lg justify-center gap-8 py-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">DevBoard</h1>
          <p className="text-sm text-muted-foreground">Your personal developer dashboard</p>
        </div>
        <form action={handleLogin}>
          <Button variant="outline" className="w-full" type="submit">
            <FaGithub size={16} /> Login with GitHub
          </Button>
        </form>
      </ContainerCard>
    </div>
  )
}
