import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RowCreateForm } from "@/features/row-create";
import { Card, CardContent } from "@/shared/ui";

export const Route = createFileRoute("/_protected/tables/$tableId/rows/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const { tableId } = Route.useParams();
	const navigate = useNavigate();

	return (
		<div>
			<Card>
				<CardContent>
					<RowCreateForm
						tableId={tableId}
						onSuccess={() => {
							navigate({ to: "/tables/$tableId", params: { tableId } });
						}}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
