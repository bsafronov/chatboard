import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { columns } from "../schema";
import { authProcedure } from "../utils";

const insertColumnSchema = createInsertSchema(columns);
const selectColumnSchema = createSelectSchema(columns);

export const column = {
	list: authProcedure
		.input(selectColumnSchema.pick({ tableId: true }))
		.handler(async ({ context: { db }, input }) => {
			return db.query.columns.findMany({
				where: eq(columns.tableId, input.tableId),
			});
		}),
	create: authProcedure
		.input(insertColumnSchema)
		.handler(async ({ context: { db }, input }) => {
			const [column] = await db.insert(columns).values(input).returning();
			return column;
		}),
	update: authProcedure
		.input(selectColumnSchema)
		.handler(async ({ context: { db }, input }) => {
			const [column] = await db
				.update(columns)
				.set(input)
				.where(eq(columns.id, input.id))
				.returning();
			return column;
		}),
	delete: authProcedure
		.input(selectColumnSchema.pick({ id: true }))
		.handler(async ({ context: { db }, input }) => {
			const [column] = await db
				.delete(columns)
				.where(eq(columns.id, input.id))
				.returning();
			return column;
		}),
};
