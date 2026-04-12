import { eq, useLiveSuspenseQuery } from "@tanstack/react-db";
import { Card } from "@/shared/ui";
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
		<Card className="flex flex-col divide-y p-0 gap-0">
			{columns.map((item) => (
				<ColumnItem key={item.id} column={item} />
			))}
		</Card>
	);
}
