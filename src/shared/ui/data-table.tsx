import { flexRender, type Table as TableType } from "@tanstack/react-table";
import {
	LucideChevronDown,
	LucideChevronsUpDown,
	LucideChevronUp,
} from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";

type Props<T> = {
	table: TableType<T>;
};

export function DataTable<T>({ table }: Props<T>) {
	const { rows } = table.getRowModel();
	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead key={header.id}>
								<div className="flex items-center gap-1 [&>svg]:size-4">
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									{header.column.getCanSort() &&
										(header.column.getIsSorted() === "asc" ? (
											<LucideChevronUp />
										) : header.column.getIsSorted() === "desc" ? (
											<LucideChevronDown />
										) : (
											<LucideChevronsUpDown />
										))}
								</div>
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{rows.map((row) => (
					<TableRow key={row.id}>
						{row.getAllCells().map((cell) => (
							<TableCell
								key={cell.id}
								style={{
									width: cell.column.getSize(),
								}}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))}
				{!rows.length && (
					<TableRow>
						<TableCell
							colSpan={table.options.columns.length}
							className="text-center text-muted-foreground"
						>
							Нет данных
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
