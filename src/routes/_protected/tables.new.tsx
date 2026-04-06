import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { tableCollection } from "@/features/table/collection";
import { TableForm } from "@/features/table/form";
import { useUser } from "@/hooks/use-user";

export const Route = createFileRoute("/_protected/tables/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const user = useUser();
	const navigate = useNavigate();

	return (
		<TableForm
			defaultValues={{
				name: "",
			}}
			onSubmit={({ value }) => {
				const id = crypto.randomUUID();

				tableCollection.insert({
					id,
					name: value.name,
					createdAt: new Date(),
					updatedAt: null,
					createdById: user.id,
					updatedById: null,
				});
				navigate({ to: "/tables/$tableId", params: { tableId: id } });
			}}
		/>
	);
}
