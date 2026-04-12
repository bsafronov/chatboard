import { eq, useLiveSuspenseQuery } from "@tanstack/react-db";
import {
	type ColumnDef,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { LucideMoreVertical } from "lucide-react";
import { useMemo } from "react";
import { columnCollection } from "@/entities/column";
import { rowCollection } from "@/entities/row";
import type { Row } from "@/server";
import {
	Button,
	DataTable,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/ui";

export type TableRow = Pick<Row, "createdAt" | "updatedAt" | "id"> & {
	[key: string]: unknown;
};

type Props = {
	tableId: string;
	onEdit: (row: TableRow) => void;
	onDelete: (row: TableRow) => void;
};

export function TableView({ tableId, onDelete, onEdit }: Props) {
	const { data: columns } = useLiveSuspenseQuery(
		(q) =>
			q
				.from({ column: columnCollection })
				.where(({ column }) => eq(column.tableId, tableId)),
		[tableId],
	);

	const { data: rows } = useLiveSuspenseQuery(
		(q) =>
			q
				.from({ row: rowCollection })
				.where(({ row }) => eq(row.tableId, tableId)),
		[tableId],
	);

	const resolvedData = useMemo(() => {
		return rows.map((row) => {
			const data: TableRow = {
				...row.data,
				id: row.id,
				createdAt: row.createdAt,
				updatedAt: row.updatedAt,
			};
			return data;
		});
	}, [rows]);

	const resolvedColumns = useMemo(() => {
		const base: ColumnDef<TableRow>[] = [
			{
				accessorKey: "createdAt",
				header: "Создано",
				cell: ({ getValue }) => format(getValue<string>(), "dd.MM.yyyy HH:mm"),
			},
			{
				accessorKey: "updatedAt",
				header: "Изменено",
				cell: ({ getValue }) => {
					const value = getValue<string | null>();
					if (!value) return null;
					return format(value, "dd.MM.yyyy HH:mm");
				},
			},
		];

		const dynamic = columns.map((column) => {
			const def: ColumnDef<TableRow> = {
				id: column.id,
				header: column.name,
				accessorKey: column.id,
			};
			return def;
		});

		const actions: ColumnDef<TableRow> = {
			id: "actions",
			size: 40,
			cell: ({ row: { original } }) => {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button size="icon-sm" variant="ghost">
									<LucideMoreVertical />
								</Button>
							}
						/>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									onEdit(original);
								}}
							>
								Изменить
							</DropdownMenuItem>
							<DropdownMenuItem
								variant="destructive"
								onClick={() => {
									onDelete(original);
								}}
							>
								Удалить
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		};

		return [...dynamic, ...base, actions];
	}, [columns, onEdit, onDelete]);

	const table = useReactTable({
		getCoreRowModel: getCoreRowModel(),
		data: resolvedData,
		columns: resolvedColumns,
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		initialState: {
			columnPinning: { right: ["actions"] },
		},
	});

	return <DataTable table={table} />;
}
