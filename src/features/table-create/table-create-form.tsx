import { TableForm, tableCollection } from "@/entities/table";
import { useUser } from "@/entities/user";
import type { Table } from "@/server";

type Props = {
	onSuccess: (table: Table) => void;
};

export function TableCreateForm({ onSuccess }: Props) {
	const user = useUser();

	return (
		<TableForm
			defaultValues={{
				name: "",
			}}
			onSubmit={({ value }) => {
				const id = crypto.randomUUID();
				const body: Table = {
					id,
					name: value.name,
					createdAt: new Date(),
					updatedAt: null,
					createdById: user.id,
					updatedById: null,
				};
				tableCollection.insert(body);
				onSuccess(body);
			}}
		/>
	);
}
