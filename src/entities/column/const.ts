import type { ColumnType } from "@/server";

export const columnTypeToName = {
	boolean: "Да/нет",
	date: "Дата",
	number: "Число",
	string: "Строка",
} satisfies Record<ColumnType, string>;

export const typeOptions = Object.entries(columnTypeToName).map(
	([type, name]) => ({
		value: type as ColumnType,
		label: name,
	}),
);
