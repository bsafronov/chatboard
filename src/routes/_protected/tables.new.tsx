import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TableCreateForm } from "@/features/table-create";
import {
	Button,
	Card,
	CardContent,
	Header,
	HeaderTitle,
	Page,
	Section,
} from "@/shared/ui";

export const Route = createFileRoute("/_protected/tables/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	return (
		<Page>
			<Header>
				<HeaderTitle>Новая таблица</HeaderTitle>
			</Header>
			<Section>
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
				<Card>
					<CardContent>
						<Button>Импорт</Button>
					</CardContent>
				</Card>
			</Section>
		</Page>
	);
}
