import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import { queryClient } from "@/lib/query-client";
import { orpc } from "@/orpc/client";

export const tableCollection = createCollection(
	queryCollectionOptions({
		queryClient,
		queryFn: orpc.getTables.call,
		queryKey: ["tables"],
		getKey: (item) => item.id,
		onInsert: async ({ transaction }) => {
			const items = transaction.mutations.map((m) => m.modified);
			await orpc.createTables.call(items);
		},
		onUpdate: async () => {},
		onDelete: async ({ transaction }) => {
			const item = transaction.mutations[0].original;
			await orpc.deleteTable.call({ id: item.id });
		},
	}),
);
