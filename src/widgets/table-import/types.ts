export type ExcelTable = {
	fileName: string;
	data: Record<string, unknown>[];
	columnNames: string[];
};
