import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TableCreateForm } from "@/features/table-create";
import {
	Card,
	CardContent,
	Header,
	HeaderTitle,
	Page,
	Section,
} from "@/shared/ui";
import { TableImport } from "@/widgets/table-import";

export const Route = createFileRoute("/_protected/tables/new/")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	return (
		<Page>
			<Header>
				<HeaderTitle>Новая таблица</HeaderTitle>
			</Header>
			<Section className="overflow-hidden">
				<Card>
					<CardContent>
						<TableCreateForm
							onSuccess={(table) => {
								navigate({
									to: "/tables/$tableId",
									params: { tableId: table.id },
								});
							}}
						/>
					</CardContent>
				</Card>
				<TableImport />
			</Section>
		</Page>
	);
}
