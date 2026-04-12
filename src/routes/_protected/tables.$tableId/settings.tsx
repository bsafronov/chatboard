import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import { ColumnList } from "@/entities/column";
import { ColumnCreateForm } from "@/features/column-create";
import { Card, CardContent, Skeleton } from "@/shared/ui";
import { TableDangerZone } from "@/widgets/table-danger-zone";

export const Route = createFileRoute("/_protected/tables/$tableId/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	const { tableId } = Route.useParams();
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-4 grow">
			<Card>
				<CardContent>
					<ColumnCreateForm
						tableId={tableId}
						onSuccess={({ reset }) => {
							reset();
						}}
					/>
				</CardContent>
			</Card>
			<Suspense fallback={<Skeleton className="grow" />}>
				<ColumnList tableId={tableId} />
			</Suspense>
			<TableDangerZone
				onDelete={(prevTable) => {
					if (!prevTable) {
						return navigate({ to: "/" });
					}
					return navigate({
						to: "/tables/$tableId",
						params: { tableId: prevTable.id },
					});
				}}
				tableId={tableId}
			/>
		</div>
	);
}
