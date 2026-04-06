import type { FormValidateFn } from "@tanstack/react-form";

export type FieldProps = {
	label: string;
	description?: string;
	placeholder?: string;
	required?: boolean;
};

export type FormProps<TData> = {
	onSubmit?: FormValidateFn<TData>;
	defaultValues: TData;
};
