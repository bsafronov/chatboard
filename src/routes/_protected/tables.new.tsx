import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TableForm, tableCollection } from "@/entities/table";
import { useUser } from "@/entities/user";

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
