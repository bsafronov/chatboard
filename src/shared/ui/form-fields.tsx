import { useStore } from "@tanstack/react-form";
import { LucideLoader2 } from "lucide-react";
import { type ComponentProps, useId } from "react";
import { useFieldContext, useFormContext } from "../lib/form-context";
import { cn } from "../lib/utils";
import type { FieldProps } from "../types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "../ui/combobox";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

export function TextField({ label, description }: FieldProps) {
	const {
		store,
		state: { value },
		handleChange,
		handleBlur,
	} = useFieldContext<string>();

	const id = useId();
	const errors = useStore(store, (state) => state.meta.errors);

	return (
		<Field>
			<FieldLabel htmlFor={id}>{label}</FieldLabel>
			{description && <FieldDescription>{description}</FieldDescription>}
			<Input
				value={value ?? ""}
				id={id}
				onChange={(e) => handleChange(e.target.value)}
				onBlur={handleBlur}
			/>
			<FieldError errors={errors.map((err) => ({ message: err.message }))} />
		</Field>
	);
}

type ComboboxOption = {
	value: string;
	label: string;
};
export function ComboboxField({
	items,
	label,
	description,
	placeholder,
}: FieldProps & {
	items: ComboboxOption[];
}) {
	const {
		store,
		state: { value },
		handleChange,
		handleBlur,
	} = useFieldContext<string>();

	const id = useId();
	const errors = useStore(store, (state) => state.meta.errors);

	return (
		<Field>
			<FieldLabel htmlFor={id}>{label}</FieldLabel>
			<FieldDescription>{description}</FieldDescription>
			<Combobox
				items={items}
				value={items.find((item) => item.value === value)}
				itemToStringValue={(item: ComboboxOption) => item.value}
				itemToStringLabel={(item) => item.label}
				onValueChange={(item) => {
					if (!item) return;
					handleChange(item.value);
				}}
				id={id}
			>
				<ComboboxInput placeholder={placeholder} onBlur={handleBlur} />
				<ComboboxContent>
					<ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
					<ComboboxList>
						{(item: ComboboxOption) => (
							<ComboboxItem key={item.value} value={item}>
								{item.label}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
			<FieldError errors={errors.map((err) => ({ message: err.message }))} />
		</Field>
	);
}

export function CheckboxField({
	label,
	description,
}: Omit<FieldProps, "placeholder" | "required">) {
	const {
		state: { value },
		handleChange,
	} = useFieldContext<boolean>();
	const id = useId();

	return (
		<Field orientation="horizontal">
			<Checkbox
				id={id}
				checked={value}
				onCheckedChange={(checked) => handleChange(!!checked)}
			/>
			<FieldContent>
				<FieldLabel htmlFor={id}>{label}</FieldLabel>
				<FieldDescription>{description}</FieldDescription>
			</FieldContent>
		</Field>
	);
}

export function SubscribeButton({ label = "Сохранить" }: { label?: string }) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" disabled={isSubmitting} className="self-end">
					{isSubmitting && <LucideLoader2 className="animate-spin" />}
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}

export function Form({
	onSubmit,
	className,
	...props
}: ComponentProps<"form">) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit?.(e);
			}}
			className={cn("flex flex-col gap-4", className)}
			{...props}
		/>
	);
}
