import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TableBreadcrumb } from "@/entities/table";
import { RowUpdateForm } from "@/features/row-update";
import {
	BreadcrumbItem,
	Card,
	CardContent,
	Header,
	Page,
	Section,
} from "@/shared/ui";

export const Route = createFileRoute("/_protected/tables/$tableId/rows/$rowId")(
	{
		component: RouteComponent,
	},
);

function RouteComponent() {
	const { tableId, rowId } = Route.useParams();
	const navigate = useNavigate();

	return (
		<Page>
			<Header>
				<TableBreadcrumb tableId={tableId}>
					<BreadcrumbItem>Редактирование записи</BreadcrumbItem>
				</TableBreadcrumb>
			</Header>
			<Section>
				<Card>
					<CardContent>
						<RowUpdateForm
							rowId={rowId}
							tableId={tableId}
							onSuccess={() => {
								navigate({ to: "/tables/$tableId", params: { tableId } });
							}}
						/>
					</CardContent>
				</Card>
			</Section>
		</Page>
	);
}
