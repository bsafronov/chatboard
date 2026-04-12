import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RowUpdateForm } from "@/features/row-update";
import { Card, CardContent } from "@/shared/ui";

export const Route = createFileRoute("/_protected/tables/$tableId/rows/$rowId")(
	{
		component: RouteComponent,
	},
);

function RouteComponent() {
	const { tableId, rowId } = Route.useParams();
	const navigate = useNavigate();

	return (
		<Card>
			<CardContent>
				<RowUpdateForm
					rowId={rowId}
					tableId={tableId}
					onSuccess={() => {
						navigate({ to: "/tables/$tableId", params: { tableId } });
					}}
				/>
			</CardContent>
		</Card>
	);
}
