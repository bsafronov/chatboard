import { TableDeleteTrigger } from "@/features/table-delete";
import type { Table } from "@/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

type Props = {
	onDelete: (prevTable?: Table) => void;
	tableId: Table["id"];
};
export function TableDangerZone({ onDelete, tableId }: Props) {
	return (
		<Card className="border-destructive-foreground/20 border bg-destructive/5 shadow-destructive/10">
			<CardHeader>
				<CardTitle>Опасная зона</CardTitle>
			</CardHeader>
			<CardContent>
				<TableDeleteTrigger tableId={tableId} onSuccess={onDelete} />
			</CardContent>
		</Card>
	);
}
