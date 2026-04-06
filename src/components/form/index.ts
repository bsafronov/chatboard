import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import {
	CheckboxField,
	ComboboxField,
	SubscribeButton,
	TextField,
} from "./fields";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup, useTypedAppFormContext } =
	createFormHook({
		fieldContext,
		formContext,
		fieldComponents: {
			TextField,
			ComboboxField,
			CheckboxField,
		},
		formComponents: {
			SubscribeButton,
		},
	});
