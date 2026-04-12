import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LucidePlus, LucideSettings } from "lucide-react";
import { Suspense, useCallback } from "react";
import { rowCollection } from "@/entities/row";
import { RowCreateAiInput } from "@/features/row-create";
import type { Row } from "@/server";
import { buttonVariants, Card, CardContent, Skeleton } from "@/shared/ui";
import { TableView } from "@/widgets/table-view";

export const Route = createFileRoute("/_protected/tables/$tableId/")({
	component: RouteComponent,
});

type TableRow = Pick<Row, "createdAt" | "updatedAt" | "id"> & {
	[key: string]: unknown;
};
function RouteComponent() {
	const { tableId } = Route.useParams();
	const navigate = useNavigate();

	const onDelete = useCallback((row: TableRow) => {
		rowCollection.delete(row.id);
	}, []);

	const onEdit = useCallback(
		(row: TableRow) => {
			navigate({
				to: "/tables/$tableId/rows/$rowId",
				params: { tableId, rowId: row.id },
			});
		},
		[tableId, navigate],
	);

	return (
		<div className="flex flex-col grow gap-4">
			<Suspense fallback={<Skeleton className="grow" />}>
				<Card>
					<CardContent className="p-0">
						<TableView tableId={tableId} onDelete={onDelete} onEdit={onEdit} />
					</CardContent>
				</Card>
			</Suspense>
			<div className="flex items-center gap-2 mt-auto">
				<Link
					to="/tables/$tableId/settings"
					params={{ tableId }}
					className={buttonVariants({ size: "icon-lg", variant: "ghost" })}
				>
					<LucideSettings />
				</Link>
				<Link
					to="/tables/$tableId/rows/new"
					params={{ tableId }}
					className={buttonVariants({ size: "icon" })}
				>
					<LucidePlus />
				</Link>
				<RowCreateAiInput />
			</div>
		</div>
	);
}
