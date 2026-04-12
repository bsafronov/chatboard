import { useAppForm } from "@/shared/lib";
import type { FormProps } from "@/shared/types";
import { FieldSet, Form } from "@/shared/ui";

export function TableForm(props: FormProps<{ name: string }>) {
	const form = useAppForm(props);

	return (
		<Form onSubmit={form.handleSubmit}>
			<FieldSet>
				<form.AppField name="name">
					{(field) => <field.TextField label="Название таблицы" />}
				</form.AppField>
			</FieldSet>
			<form.AppForm>
				<form.SubscribeButton />
			</form.AppForm>
		</Form>
	);
}
