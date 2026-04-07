import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LucidePlus, LucideSettings } from "lucide-react";
import { Suspense, useCallback } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Row } from "@/db/schema";
import { rowCollection } from "@/features/row/collection";
import { TableView } from "@/features/table/table-view";

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
			<div className="flex gap-2 justify-end">
				<Link
					to="/tables/$tableId/settings"
					params={{ tableId }}
					className={buttonVariants({ size: "icon" })}
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
			</div>
			<Suspense fallback={<Skeleton className="grow" />}>
				<Card>
					<CardContent className="p-0">
						<TableView tableId={tableId} onDelete={onDelete} onEdit={onEdit} />
					</CardContent>
				</Card>
			</Suspense>
		</div>
	);
}
