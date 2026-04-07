import { useAppForm } from "@/components/form";
import { Form } from "@/components/form/fields";
import type { FormProps } from "@/components/form/types";
import { FieldSet } from "@/components/ui/field";
import type { Column } from "@/db/schema";

type RowFormProps = FormProps<Record<string, unknown>> & {
	columns: Pick<Column, "id" | "type" | "name" | "required">[];
};

export function RowForm({ columns, ...props }: RowFormProps) {
	const form = useAppForm(props);

	return (
		<Form onSubmit={form.handleSubmit}>
			<FieldSet>
				{columns.map(({ id, name, required, type }) => (
					<form.AppField key={id} name={id}>
						{(field) => {
							switch (type) {
								case "string":
									return <field.TextField label={name} required={required} />;
								case "boolean":
									return <field.CheckboxField label={name} />;
								case "number":
									return <field.TextField label={name} required={required} />;
								case "date":
									return <field.TextField label={name} required={required} />;
							}
						}}
					</form.AppField>
				))}
			</FieldSet>
			<form.AppForm>
				<form.SubscribeButton />
			</form.AppForm>
		</Form>
	);
}
