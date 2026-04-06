import { eq, useLiveSuspenseQuery } from "@tanstack/react-db";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	type ColumnDef,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { LucideSettings } from "lucide-react";
import { useMemo } from "react";
import { buttonVariants } from "@/components/ui/button";
import { columnCollection } from "@/features/column/collection";
import { DataTable } from "@/features/table/data-table";

export const Route = createFileRoute("/_protected/tables/$tableId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { tableId } = Route.useParams();

	const { data: columns } = useLiveSuspenseQuery((q) =>
		q
			.from({ column: columnCollection })
			.where(({ column }) => eq(column.tableId, tableId)),
	);

	const resolvedColumns = useMemo(() => {
		return columns.map((column) => {
			const def: ColumnDef<Record<string, unknown>> = {
				id: column.id,
				header: column.name,
				accessorKey: column.id,
			};
			return def;
		});
	}, [columns]);

	const table = useReactTable({
		getCoreRowModel: getCoreRowModel(),
		data: [],
		columns: resolvedColumns,
	});

	return (
		<div>
			<Link
				to="/tables/$tableId/settings"
				params={{ tableId }}
				className={buttonVariants({ size: "icon" })}
			>
				<LucideSettings />
			</Link>
			<DataTable table={table} />
		</div>
	);
}
