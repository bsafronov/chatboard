import { flexRender, type Table as TableType } from "@tanstack/react-table";
import { DataTableCell } from "./cell";
import { DataTablePagination } from "./pagination";
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
	const selectedCount = table.getFilteredSelectedRowModel().rows.length;
	const shouldShowSelectedCount = selectedCount > 0;
	const shouldShowPagination =
		table.getCoreRowModel().flatRows.length >
		table.getState().pagination.pageSize;
	const shouldShowBottomBar = shouldShowPagination || shouldShowSelectedCount;

	return (
		<div className="overflow-hidden grow flex flex-col">
			<Table className="grow">
				<colgroup>
					{table.getVisibleLeafColumns().map((column) => (
						<col
							key={column.id}
							style={{
								width: column.getSize() === 150 ? "auto" : column.getSize(),
							}}
						/>
					))}
				</colgroup>
				<TableHeader className="sticky top-0 z-10">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									colSpan={header.colSpan}
									className="overflow-hidden"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.id}
							isGrouped={row.getIsGrouped()}
							aria-expanded={row.getIsExpanded()}
						>
							{row.getAllCells().map((cell) => (
								<DataTableCell cell={cell} key={cell.id} />
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
			{shouldShowBottomBar && (
				<div className="flex items-center justify-between p-2 flex-wrap mt-auto border-t">
					{shouldShowSelectedCount && (
						<div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
							Выбрано {selectedCount} из&nbsp;
							{table.getFilteredRowModel().rows.length} строк
						</div>
					)}
					{shouldShowPagination && <DataTablePagination table={table} />}
				</div>
			)}
		</div>
	);
}
