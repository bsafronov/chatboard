import { useAppForm } from "@/components/form";
import { Form } from "@/components/form/fields";
import type { FormProps } from "@/components/form/types";
import { FieldSet } from "@/components/ui/field";

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
