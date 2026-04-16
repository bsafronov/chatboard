import {
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedRowModel,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type TableOptions,
	useReactTable,
} from "@tanstack/react-table";

type Props<T> = Omit<TableOptions<T>, "getCoreRowModel">;
export function useTable<T>({ initialState, ...props }: Props<T>) {
	return useReactTable({
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		initialState: {
			...initialState,
			pagination: {
				pageSize: 50,
				...initialState?.pagination,
			},
		},
		...props,
	});
}
