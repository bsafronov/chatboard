import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { read, utils } from "xlsx";
import { previewTableDataStore } from "@/entities/table";
import { TableCreateForm } from "@/features/table-create";
import {
	Card,
	CardContent,
	Dropzone,
	Header,
	HeaderTitle,
	Page,
	Section,
} from "@/shared/ui";

export const Route = createFileRoute("/_protected/tables/new/")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	return (
		<Page>
			<Header>
				<HeaderTitle>Новая таблица</HeaderTitle>
			</Header>
			<Section>
				<Card>
					<CardContent>
						<TableCreateForm
							onSuccess={(table) => {
								navigate({
									to: "/tables/$tableId",
									params: { tableId: table.id },
								});
							}}
						/>
					</CardContent>
				</Card>
				<Dropzone
					onDrop={(files) => {
						parseExcel(files[0], {
							onSuccess: (data) => {
								previewTableDataStore.setState(() => data);
								navigate({ to: "/tables/new/preview" });
							},
						});
					}}
					accept={{
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
							[],
						"text/csv": [],
					}}
				/>
			</Section>
		</Page>
	);
}

function parseExcel(
	file: File,
	{ onSuccess }: { onSuccess?: (data: Record<string, unknown>[]) => void },
) {
	const reader = new FileReader();

	reader.onload = (e) => {
		const data = e.target?.result;
		if (!data) return;
		const workbook = read(data, { type: "array" });
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];
		const json = utils.sheet_to_json(sheet, {
			defval: "",
		});
		onSuccess?.(json as Record<string, unknown>[]);
	};

	reader.readAsArrayBuffer(file);
}
