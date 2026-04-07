import { and, eq, useLiveSuspenseQuery } from "@tanstack/react-db";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { columnCollection } from "@/features/column/collection";
import { rowCollection } from "@/features/row/collection";
import { RowForm } from "@/features/row/form";
import { useUser } from "@/hooks/use-user";

export const Route = createFileRoute("/_protected/tables/$tableId/rows/$rowId")(
	{
		component: RouteComponent,
	},
);

function RouteComponent() {
	const { tableId, rowId } = Route.useParams();
	const user = useUser();
	const navigate = useNavigate();
	const { data: columns } = useLiveSuspenseQuery(
		(q) =>
			q
				.from({ column: columnCollection })
				.where(({ column }) => eq(column.tableId, tableId)),
		[tableId],
	);

	const { data: row } = useLiveSuspenseQuery(
		(q) =>
			q
				.from({ row: rowCollection })
				.where(({ row }) => and(eq(row.id, rowId), eq(row.tableId, tableId)))
				.findOne(),
		[rowId, tableId],
	);

	if (!row) return null;

	return (
		<div>
			<RowForm
				columns={columns}
				defaultValues={row.data}
				onSubmit={({ value }) => {
					rowCollection.update(row.id, (d) => {
						d.data = value;
						d.updatedAt = new Date();
						d.updatedById = user.id;
					});
					navigate({ to: "/tables/$tableId", params: { tableId } });
				}}
			/>
		</div>
	);
}
