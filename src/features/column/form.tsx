import z from "zod";
import { useAppForm } from "@/components/form";
import { Form } from "@/components/form/fields";
import type { FormProps } from "@/components/form/types";
import { FieldSet } from "@/components/ui/field";
import type { Column } from "@/db/schema";
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
