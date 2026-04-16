import "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface ColumnMeta<TData, TValue> {
		align?: "start" | "center" | "end";
	}
}
