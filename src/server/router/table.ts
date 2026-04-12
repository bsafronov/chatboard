import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tables } from "../schema";
import { authProcedure } from "../utils";

const insertTableSchema = createInsertSchema(tables);
const selectTableSchema = createSelectSchema(tables);

export const table = {
	list: authProcedure.handler(async ({ context: { db, user } }) => {
		return db.query.tables.findMany({
			where: eq(tables.createdById, user.id),
		});
	}),
	update: authProcedure
		.input(selectTableSchema)
		.handler(async ({ context: { db }, input }) => {
			const [table] = await db
				.update(tables)
				.set(input)
				.where(eq(tables.id, input.id))
				.returning();
			return table;
		}),
	create: authProcedure
		.input(insertTableSchema.array())
		.handler(async ({ context: { db }, input }) => {
			const items = await db.insert(tables).values(input).returning();
			return items.slice(0, input.length);
		}),
	delete: authProcedure
		.input(selectTableSchema.pick({ id: true }))
		.handler(async ({ context: { db }, input }) => {
			return db.delete(tables).where(eq(tables.id, input.id));
		}),
};
