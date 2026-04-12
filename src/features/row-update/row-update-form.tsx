import { and, eq, useLiveSuspenseQuery } from "@tanstack/react-db";
import { notFound } from "@tanstack/react-router";
import { columnCollection } from "@/entities/column";
import { RowForm, rowCollection } from "@/entities/row";
import { useUser } from "@/entities/user";
import type { Row, Table } from "@/server";

type Props = {
	tableId: Table["id"];
	rowId: Row["id"];
	onSuccess?: () => void;
};

export function RowUpdateForm({ tableId, rowId, onSuccess }: Props) {
	const user = useUser();
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

	if (!row) {
		throw notFound();
	}

	return (
		<RowForm
			columns={columns}
			defaultValues={row.data}
			onSubmit={({ value }) => {
				rowCollection.update(row.id, (d) => {
					d.data = value;
					d.updatedAt = new Date();
					d.updatedById = user.id;
				});
				onSuccess?.();
			}}
		/>
	);
}
