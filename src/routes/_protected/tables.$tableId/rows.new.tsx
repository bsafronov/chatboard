import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TableBreadcrumb } from "@/entities/table";
import { RowCreateForm } from "@/features/row-create";
import {
	BreadcrumbItem,
	Card,
	CardContent,
	Header,
	Page,
	Section,
} from "@/shared/ui";

export const Route = createFileRoute("/_protected/tables/$tableId/rows/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const { tableId } = Route.useParams();
	const navigate = useNavigate();

	return (
		<Page>
			<Header>
				<TableBreadcrumb tableId={tableId}>
					<BreadcrumbItem>Новая запись</BreadcrumbItem>
				</TableBreadcrumb>
			</Header>
			<Section>
				<Card>
					<CardContent>
						<RowCreateForm
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
