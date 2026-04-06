import { createFileRoute } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

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
						onClick={() => authClient.signIn.social({ provider: "github" })}
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
