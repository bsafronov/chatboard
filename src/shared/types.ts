/** biome-ignore-all lint/suspicious/noExplicitAny: lib */

import type { FormValidateFn, FormApi as TFormApi } from "@tanstack/react-form";

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

export type FormApi<TData> = TFormApi<
	TData,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any
>;
