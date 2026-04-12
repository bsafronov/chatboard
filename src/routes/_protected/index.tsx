import { createFileRoute } from "@tanstack/react-router";
import { Header, Page, Section } from "@/shared/ui";

export const Route = createFileRoute("/_protected/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Page>
			<Header />
			<Section className="grid place-items-center text-muted-foreground text-xl">
				Выберите чат
			</Section>
		</Page>
	);
}
