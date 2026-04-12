import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { columnCollection } from "@/entities/column";
import { RowForm, rowCollection } from "@/entities/row";
import { useUser } from "@/entities/user";
import { Card, CardContent } from "@/shared/ui";

export const Route = createFileRoute("/_protected/tables/$tableId/rows/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const { tableId } = Route.useParams();
	const user = useUser();
	const navigate = useNavigate();
	const { data: columns } = useLiveQuery(
		(q) =>
			q
				.from({ column: columnCollection })
				.where(({ column }) => eq(column.tableId, tableId)),
		[tableId],
	);

	return (
		<div>
			<Card>
				<CardContent>
					<RowForm
						columns={columns}
						defaultValues={{}}
						onSubmit={({ value }) => {
							const id = crypto.randomUUID();
							rowCollection.insert({
								createdById: user.id,
								createdAt: new Date(),
								data: value,
								id,
								tableId,
								updatedAt: null,
								updatedById: null,
							});
							navigate({ to: "/tables/$tableId", params: { tableId } });
						}}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
