import z from "zod";
import type { Column } from "@/server";
import { useAppForm } from "@/shared/lib";
import type { FormProps } from "@/shared/types";
import { FieldSet, Form } from "@/shared/ui";
import { typeOptions } from "./const";

type Data = Pick<Column, "name" | "type" | "required">;

export function ColumnForm(props: FormProps<Data>) {
	const form = useAppForm(props);

	return (
		<Form onSubmit={form.handleSubmit}>
			<FieldSet>
				<form.AppField
					name="name"
					validators={{
						onSubmit: z.string().min(1, { error: "Обязательное поле" }),
					}}
				>
					{(field) => <field.TextField label="Название" required />}
				</form.AppField>
				<form.AppField name="type">
					{(field) => (
						<field.ComboboxField
							items={typeOptions}
							label="Тип колонки"
							required
						/>
					)}
				</form.AppField>
			</FieldSet>
			<form.AppForm>
				<form.SubscribeButton />
			</form.AppForm>
		</Form>
	);
}
