import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { columnCollection } from "@/features/column/collection";
import { ColumnForm } from "@/features/column/form";
import { ColumnList } from "@/features/column/list";
import { tableCollection } from "@/features/table/collection";
import { TableDangerZone } from "@/features/table/danger-zone";
import { useUser } from "@/hooks/use-user";

export const Route = createFileRoute("/_protected/tables/$tableId/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	const { tableId } = Route.useParams();
	const user = useUser();
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-4 grow">
			<Card>
				<CardContent>
					<ColumnForm
						defaultValues={{
							name: "",
							type: "string",
							required: true,
						}}
						onSubmit={({ value, formApi }) => {
							console.log({ value });
							const id = crypto.randomUUID();
							columnCollection.insert({
								id,
								createdAt: new Date(),
								createdById: user.id,
								name: value.name,
								type: value.type,
								required: value.required,
								tableId,
								updatedAt: null,
								updatedById: null,
							});
							formApi.reset();
						}}
					/>
				</CardContent>
			</Card>
			<Suspense fallback={<Skeleton className="grow" />}>
				<ColumnList tableId={tableId} />
			</Suspense>
			<TableDangerZone
				onDelete={() => {
					const keys = [...tableCollection.state.keys()];
					const prevKey = keys.indexOf(tableId) - 1;
					const prev = tableCollection.state.get(keys[prevKey]);
					tableCollection.delete(tableId);

					if (!prev) {
						return navigate({ to: "/" });
					}

					return navigate({
						to: "/tables/$tableId",
						params: { tableId: prev.id },
					});
				}}
			/>
		</div>
	);
}
