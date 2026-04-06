import { createFileRoute, Link } from "@tanstack/react-router";
import { LucideSettings } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/_protected/tables/$tableId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { tableId } = Route.useParams();
	return (
		<div>
			<Link
				to="/tables/$tableId/settings"
				params={{ tableId }}
				className={buttonVariants({ size: "icon" })}
			>
				<LucideSettings />
			</Link>
		</div>
	);
}
