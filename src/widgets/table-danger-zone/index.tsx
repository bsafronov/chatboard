import { TableDeleteTrigger } from "@/features/table-delete";
import type { Table } from "@/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

type Props = {
	onDelete: (prevTable?: Table) => void;
	tableId: Table["id"];
};
export function TableDangerZone({ onDelete, tableId }: Props) {
	return (
		<Card variant="destructive">
			<CardHeader>
				<CardTitle>Опасная зона</CardTitle>
			</CardHeader>
			<CardContent>
				<TableDeleteTrigger tableId={tableId} onSuccess={onDelete} />
			</CardContent>
		</Card>
	);
}
