import { type Cell, flexRender } from "@tanstack/react-table";
import { TableCell } from "./table";

type Props<T> = {
	cell: Cell<T, unknown>;
};

export function DataTableCell<T>({ cell }: Props<T>) {
	const {
		column: { columnDef },
		getContext,
		getIsAggregated,
		getIsGrouped,
		getIsPlaceholder,
	} = cell;

	const isPlaceholder = getIsPlaceholder();
	const isGrouped = getIsGrouped();
	const isAggregated = getIsAggregated();
	const context = getContext();

	const renderContent = () => {
		if (isPlaceholder) return null;
		if (isAggregated) {
			return flexRender(columnDef.aggregatedCell, context);
		}
		return flexRender(columnDef.cell, context);
	};

	return (
		<TableCell
			data-placeholder={isPlaceholder ? "" : undefined}
			data-grouped={isGrouped ? "" : undefined}
			data-aggregated={isAggregated ? "" : undefined}
			className="overflow-hidden"
		>
			{renderContent()}
		</TableCell>
	);
}
