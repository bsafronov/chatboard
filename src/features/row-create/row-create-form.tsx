import { eq, useLiveQuery } from "@tanstack/react-db";
import { columnCollection } from "@/entities/column";
import { RowForm, rowCollection } from "@/entities/row";
import { useUser } from "@/entities/user";
import type { Row, Table } from "@/server";

type Props = {
	tableId: Table["id"];
	onSuccess: (row: Row) => void;
};

export function RowCreateForm({ tableId, onSuccess }: Props) {
	const user = useUser();
	const { data: columns } = useLiveQuery(
		(q) =>
			q
				.from({ column: columnCollection })
				.where(({ column }) => eq(column.tableId, tableId)),
		[tableId],
	);

	return (
		<RowForm
			columns={columns}
			defaultValues={{}}
			onSubmit={({ value }) => {
				const id = crypto.randomUUID();
				const body: Row = {
					createdById: user.id,
					createdAt: new Date(),
					data: value,
					id,
					tableId,
					updatedAt: null,
					updatedById: null,
				};
				rowCollection.insert(body);
				onSuccess(body);
			}}
		/>
	);
}
