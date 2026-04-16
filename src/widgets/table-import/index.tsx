import { useState } from "react";
import { parseExcelFiles } from "@/shared/lib";
import { Button, Card, Dropzone } from "@/shared/ui";
import type { ExcelTable } from "./types";
import { TableImportView } from "./view";

export function TableImport() {
	const [isLoading, setLoading] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const [tables, setTables] = useState<ExcelTable[]>([]);

	const handleDrop = async (files: File[]) => {
		setLoading(true);
		setLoaded(false);

		try {
			const results = await parseExcelFiles(files);
			const tables: ExcelTable[] = results.map((data, index) => {
				const fileName = files[index].name.split(".")[0];
				const columnNames = Object.keys(data[0]);
				return {
					columnNames,
					data,
					fileName,
				};
			});
			setTables(tables);
			setLoaded(true);
		} catch (error) {
			console.error("Ошибка при парсинге:", error);
		} finally {
			setLoading(false);
		}
	};

	if (isLoaded) {
		return (
			<Card className="py-0 gap-0 relative overflow-hidden min-h-0 shrink">
				<TableImportView data={tables} />
				<div className="flex justify-end border-t p-2 gap-2 sticky bottom-0 left-0 w-full">
					<Button
						variant="ghost"
						onClick={() => {
							setTables([]);
							setLoaded(false);
						}}
					>
						Отменить
					</Button>
					<Button>Сохранить</Button>
				</div>
			</Card>
		);
	}

	return (
		<Dropzone
			title="Импорт из Excel"
			isLoading={isLoading}
			onDrop={handleDrop}
			accept={{
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
				"text/csv": [],
			}}
		/>
	);
}
