import { createFormHook } from "@tanstack/react-form";
import {
	CheckboxField,
	ComboboxField,
	SubscribeButton,
	TextField,
} from "../ui/form-fields";
import { fieldContext, formContext } from "./form-context";

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
