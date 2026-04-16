import { read, utils } from "xlsx";

export function parseExcelFiles(
	files: File[],
): Promise<Record<string, unknown>[][]> {
	return Promise.all(
		files.map((file) => {
			return new Promise<Record<string, unknown>[]>((resolve, reject) => {
				const reader = new FileReader();

				reader.onload = (e) => {
					try {
						const data = e.target?.result;
						if (!data) {
							reject(new Error(`Файл ${file.name} пустой`));
							return;
						}

						const workbook = read(data, { type: "array" });
						const sheetName = workbook.SheetNames[0];
						const sheet = workbook.Sheets[sheetName];

						if (!sheet) {
							reject(new Error(`Лист не найден в ${file.name}`));
							return;
						}

						const json = utils.sheet_to_json(sheet, {
							defval: "",
						});

						resolve(json as Record<string, unknown>[]);
					} catch (error) {
						reject(error);
					}
				};

				reader.onerror = () => reject(new Error(`Ошибка чтения ${file.name}`));

				reader.readAsArrayBuffer(file);
			});
		}),
	);
}
