import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection, parseWhereExpression } from "@tanstack/react-db";
import z from "zod";
import { orpc, queryClient } from "@/shared/lib";

export const columnCollection = createCollection(
	queryCollectionOptions({
		queryClient,
		syncMode: "on-demand",
		queryFn: ({ meta }) => {
			const parsed = parseWhereExpression(meta?.loadSubsetOptions?.where, {
				handlers: {
					eq: (field, value) => ({
						[field]: value,
					}),
				},
			});

			const schema = z.object({
				tableId: z.string(),
			});

			const { tableId } = schema.parse(parsed);

			return orpc.column.list.call({ tableId });
		},
		getKey: (item) => item.id,
		queryKey: (opts) => {
			const parsed = parseWhereExpression(opts.where, {
				handlers: {
					eq: (field, value) => ({
						[field]: value,
					}),
				},
			});
			if (!parsed) return ["columns"];

			return ["columns", parsed];
		},
		onInsert: async ({ transaction }) => {
			const item = transaction.mutations[0].modified;
			await orpc.column.create.call(item);
		},
		onUpdate: async ({ transaction }) => {
			const item = transaction.mutations[0].modified;
			await orpc.column.update.call(item);
		},
		onDelete: async ({ transaction }) => {
			const item = transaction.mutations[0].original;
			await orpc.column.delete.call({ id: item.id });
		},
	}),
);
