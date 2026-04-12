import { ColumnForm, columnCollection } from "@/entities/column";
import { useUser } from "@/entities/user";
import type { Column, Table } from "@/server";

type Props = {
	tableId: Table["id"];
	onSuccess: (props: { column: Column; reset: () => void }) => void;
};

export function ColumnCreateForm({ tableId, onSuccess }: Props) {
	const user = useUser();
	return (
		<ColumnForm
			defaultValues={{
				name: "",
				type: "string",
				required: true,
			}}
			onSubmit={({ value, formApi }) => {
				console.log({ value });
				const id = crypto.randomUUID();
				const body: Column = {
					id,
					createdAt: new Date(),
					createdById: user.id,
					name: value.name,
					type: value.type,
					required: value.required,
					tableId,
					updatedAt: null,
					updatedById: null,
				};
				columnCollection.insert(body);
				onSuccess({ column: body, reset: formApi.reset });
			}}
		/>
	);
}
