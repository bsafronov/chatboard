import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import {
	type ColumnDef,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { previewTableDataStore } from "@/entities/table";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	DataTable,
	Header,
	Page,
	Section,
} from "@/shared/ui";

export const Route = createFileRoute("/_protected/tables/new/preview")({
	component: RouteComponent,
	loader: () => {
		if (!previewTableDataStore.get().length) {
			throw redirect({ to: "/tables/new" });
		}
	},
});

function RouteComponent() {
	const [data] = useState(previewTableDataStore.get());
	const [columns] = useState(() => {
		return Object.keys(data[0]).map(
			(header, idx): ColumnDef<Record<string, unknown>> => {
				return {
					id: idx.toString(),
					header,
					accessorKey: header,
				};
			},
		);
	});

	const table = useReactTable({
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		data,
		columns,
	});

	return (
		<Page className="overflow-hidden">
			<Header>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink
								render={<Link to="/tables/new">Новая таблица</Link>}
							/>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>Превью</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</Header>
			<Section className="p-0 overflow-hidden">
				<DataTable table={table} />
			</Section>
		</Page>
	);
}
