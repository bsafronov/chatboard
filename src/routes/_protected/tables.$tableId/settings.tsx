import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import { ColumnList } from "@/entities/column";
import { TableBreadcrumb } from "@/entities/table";
import { ColumnCreateForm } from "@/features/column-create";
import {
	BreadcrumbItem,
	Card,
	CardContent,
	Header,
	Page,
	Section,
	Skeleton,
} from "@/shared/ui";
import { TableDangerZone } from "@/widgets/table-danger-zone";

export const Route = createFileRoute("/_protected/tables/$tableId/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	const { tableId } = Route.useParams();
	const navigate = useNavigate();

	return (
		<Page>
			<Header>
				<TableBreadcrumb tableId={tableId}>
					<BreadcrumbItem>Настройки</BreadcrumbItem>
				</TableBreadcrumb>
			</Header>
			<Section>
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
			</Section>
		</Page>
	);
}
