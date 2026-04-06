import { eq, useLiveSuspenseQuery } from "@tanstack/react-db";
import { columnCollection } from "./collection";
import { ColumnItem } from "./item";

type Props = {
	tableId: string;
};

export function ColumnList({ tableId }: Props) {
	const { data: columns } = useLiveSuspenseQuery((q) =>
		q
			.from({ column: columnCollection })
			.where((q) => eq(q.column.tableId, tableId)),
	);

	return (
		<div className="flex flex-col gap-2">
			{columns.map((item) => (
				<ColumnItem key={item.id} column={item} />
			))}
		</div>
	);
}
