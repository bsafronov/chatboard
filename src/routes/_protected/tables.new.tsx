import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TableCreateForm } from "@/features/table-create";
import { Card, CardContent } from "@/shared/ui";

export const Route = createFileRoute("/_protected/tables/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	return (
		<Card>
			<CardContent>
				<TableCreateForm
					onSuccess={(table) => {
						navigate({ to: "/tables/$tableId", params: { tableId: table.id } });
					}}
				/>
			</CardContent>
		</Card>
	);
}
