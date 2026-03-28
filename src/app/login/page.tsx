import { Button } from "@/lib/components/Button";
import { ContainerCard } from "@/lib/components/Container";

export default function Login() {
    return (<>
        <div className="w-32  mx-auto flex flex-col justify-center items-center h-full">
            <ContainerCard>
                <h1>DevBoard</h1>
                Your personal developer dashboard
                <Button>Login with GitHub</Button>
            </ContainerCard>
        </div>
    </>)
}