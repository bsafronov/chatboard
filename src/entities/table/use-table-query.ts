import { eq, useLiveSuspenseQuery } from "@tanstack/react-db";
import { notFound } from "@tanstack/react-router";
import { tableCollection } from "./collection";

type Props = {
	tableId: string;
};
export function useTableQuery({ tableId }: Props) {
	const query = useLiveSuspenseQuery(
		(q) =>
			q
				.from({ table: tableCollection })
				.where(({ table }) => eq(table.id, tableId))
				.findOne(),
		[tableId],
	);

	const { data } = query;

	if (!data) {
		throw notFound();
	}

	return { ...query, data };
}
