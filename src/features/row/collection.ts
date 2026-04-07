import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection, parseWhereExpression } from "@tanstack/react-db";
import z from "zod";
import { queryClient } from "@/lib/query-client";
import { orpc } from "@/orpc/client";

export const rowCollection = createCollection(
	queryCollectionOptions({
		queryClient,
		syncMode: "on-demand",
		queryFn: ({ meta }) => {
			const parsed = parseWhereExpression(meta?.loadSubsetOptions?.where, {
				handlers: {
					eq: (field, value) => ({
						[field]: value,
					}),
					and: (...filters) => Object.assign({}, ...filters),
				},
			});

			const schema = z.object({
				tableId: z.string(),
				rowId: z.string().optional(),
			});

			const { tableId } = schema.parse(parsed);

			return orpc.getRows.call({ tableId });
		},
		getKey: (item) => item.id,
		queryKey: (opts) => {
			const parsed = parseWhereExpression(opts.where, {
				handlers: {
					eq: (field, value) => ({
						[field]: value,
					}),
					and: (...filters) => Object.assign({}, ...filters),
				},
			});
			if (!parsed) return ["rows"];

			return ["rows", parsed];
		},
		onInsert: async ({ transaction }) => {
			const item = transaction.mutations[0].modified;
			await orpc.createRow.call(item);
		},
		onUpdate: async ({ transaction }) => {
			const item = transaction.mutations[0].modified;
			await orpc.updateRow.call(item);
		},
		onDelete: async ({ transaction }) => {
			const item = transaction.mutations[0].original;
			await orpc.deleteRow.call({ id: item.id });
		},
	}),
);
