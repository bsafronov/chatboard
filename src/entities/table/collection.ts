import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import { orpc, queryClient } from "@/shared/lib";

export const tableCollection = createCollection(
	queryCollectionOptions({
		queryClient,
		queryFn: orpc.table.list.call,
		queryKey: ["tables"],
		getKey: (item) => item.id,
		onInsert: async ({ transaction }) => {
			const items = transaction.mutations.map((m) => m.modified);
			await orpc.table.create.call(items);
		},
		onUpdate: async () => {},
		onDelete: async ({ transaction }) => {
			const item = transaction.mutations[0].original;
			await orpc.table.delete.call({ id: item.id });
		},
	}),
);
