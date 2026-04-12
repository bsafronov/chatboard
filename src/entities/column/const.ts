import type { ColumnType } from "@/server";

export const typeToName = {
	boolean: "Да/нет",
	date: "Дата",
	number: "Число",
	string: "Строка",
} satisfies Record<ColumnType, string>;

export const typeOptions = Object.entries(typeToName).map(([type, name]) => ({
	value: type as ColumnType,
	label: name,
}));
