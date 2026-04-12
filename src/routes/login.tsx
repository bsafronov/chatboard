import { createFileRoute } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import { auth } from "@/shared/lib";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid place-items-center h-screen">
			<Card className="min-w-md">
				<CardHeader>
					<CardTitle>Авторизация</CardTitle>
				</CardHeader>
				<CardContent>
					<Button
						onClick={() => auth.signIn.social({ provider: "github" })}
						className="w-full"
					>
						<FaGithub />
						Войти с GitHub
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
