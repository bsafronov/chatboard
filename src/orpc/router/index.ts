import { eq } from "drizzle-orm";
import { insertTableSchema, TableSchema, tables } from "@/db/schema";
import { authProcedure } from "../utils";

export const getTables = authProcedure.handler(
	async ({ context: { db, user } }) => {
		return db.query.tables.findMany({
			where: (t) => eq(t.createdById, user.id),
		});
	},
);

export const createTables = authProcedure
	.input(insertTableSchema.array())
	.handler(async ({ context: { db }, input }) => {
		const items = await db.insert(tables).values(input).returning();
		return items.slice(0, input.length);
	});

export const deleteTable = authProcedure
	.input(TableSchema.pick({ id: true }))
	.handler(async ({ context: { db }, input }) => {
		return db.delete(tables).where(eq(tables.id, input.id));
	});
