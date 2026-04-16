import { createColumnHelper } from "@tanstack/react-table";
import { Check, ChevronDown, ChevronUp, Edit, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { columnTypeToName } from "@/entities/column";
import type { ColumnType } from "@/server";
import { useTable } from "@/shared/hooks";
import {
	Badge,
	Button,
	Checkbox,
	DataTable,
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/shared/ui";
import type { ExcelTable } from "./types";

type Data = {
	fileName: string;
	columnName: string;
	columnType: ColumnType;
	uniqueValues: string[];
};

const columnHelper = createColumnHelper<Data>();

const CellEditable = ({ initialValue }: { initialValue: string }) => {
	const [value, setValue] = useState(initialValue);
	const [isEditing, setEditing] = useState(false);

	const handleCancel = () => {
		setEditing(false);
		setValue(initialValue);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return isEditing ? (
		<InputGroup>
			<InputGroupInput
				value={value}
				autoFocus
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={(e) => {
					console.log(e.key);
					if (e.key === "Enter") {
						e.preventDefault();
						setEditing(false);
					}
					if (e.key === "Escape") {
						e.preventDefault();
						handleCancel();
					}
				}}
			/>
			<InputGroupAddon align={"inline-end"}>
				<Button
					size={"icon-sm"}
					variant={"ghost"}
					onClick={() => setEditing(false)}
				>
					<Check />
				</Button>
				<Button size={"icon-sm"} variant={"ghost"} onClick={handleCancel}>
					<X />
				</Button>
			</InputGroupAddon>
		</InputGroup>
	) : (
		<div className="flex gap-1 items-center">
			<Button
				size={"icon-sm"}
				variant={"ghost"}
				className={"text-muted-foreground"}
				onClick={() => setEditing(true)}
			>
				<Edit />
			</Button>
			<span>{value}</span>
		</div>
	);
};

const columns = [
	columnHelper.display({
		id: "select",
		size: 40,
		aggregatedCell: ({ row }) => {
			return (
				<Checkbox
					className={"mx-auto"}
					checked={row.getIsAllSubRowsSelected()}
					onCheckedChange={row.getToggleSelectedHandler()}
				/>
			);
		},
		cell: ({ row }) => {
			return (
				<Checkbox
					className={"mx-auto"}
					checked={row.getIsSelected()}
					onCheckedChange={row.getToggleSelectedHandler()}
				/>
			);
		},
	}),
	columnHelper.display({
		id: "expand",
		size: 40,
		aggregatedCell: ({ row }) => {
			return (
				<Button
					size="icon-sm"
					variant="ghost"
					disabled={!row.getCanExpand()}
					onClick={row.getToggleExpandedHandler()}
					className={"mx-auto"}
				>
					{row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
				</Button>
			);
		},
	}),
	columnHelper.accessor("fileName", {
		header: "Название",
		cell: ({ getValue }) => {
			return <CellEditable initialValue={getValue()} />;
		},
	}),
	columnHelper.accessor("columnName", {
		header: "Колонка",
		aggregatedCell: ({ renderValue }) => {
			return <Badge>Всего: {renderValue()}</Badge>;
		},
		cell: ({ getValue }) => {
			return <CellEditable initialValue={getValue()} />;
		},
		aggregationFn: "count",
	}),
	columnHelper.accessor("columnType", {
		header: "Тип колонки",
		cell: ({ getValue }) => {
			return (
				<Badge variant={"secondary"}>{columnTypeToName[getValue()]}</Badge>
			);
		},
	}),
	columnHelper.accessor((row) => row.uniqueValues.slice(0, 5).join(", "), {
		id: "uniqueValues",
		header: "Значения",
		cell: ({ renderValue, getValue }) => {
			return (
				<span className="flex items-center gap-1">
					<span className="block truncate text-muted-foreground">
						{renderValue()}
					</span>
					<span>({getValue().length})</span>
				</span>
			);
		},
	}),
];

type Props = {
	data: ExcelTable[];
};

export function TableImportView({ data }: Props) {
	const resolvedData = useMemo(() => {
		return data.flatMap((table) => {
			const uniqueValuesByColumn = new Map<string, Set<string>>();
			table.data.forEach((row) => {
				Object.entries(row).forEach(([columnName, value]) => {
					if (!uniqueValuesByColumn.has(columnName)) {
						uniqueValuesByColumn.set(columnName, new Set<string>());
					}
					uniqueValuesByColumn.get(columnName)?.add(String(value));
				});
			});
			return table.columnNames.map((columnName): Data => {
				return {
					columnName,
					fileName: table.fileName,
					columnType: typeof table.data[0][columnName] as ColumnType,
					uniqueValues: [
						...(uniqueValuesByColumn.get(columnName)?.keys() ?? []),
					],
				};
			});
		});
	}, [data]);

	console.log({ resolvedData });

	const table = useTable({
		columns,
		data: resolvedData,
		groupedColumnMode: false,
		initialState: {
			expanded: data.length === 1 ? true : undefined,
			grouping: ["fileName"],
			rowSelection: Object.fromEntries(
				resolvedData.map((_, idx) => [idx.toString(), true]),
			),
		},
	});

	return <DataTable table={table} />;
}
