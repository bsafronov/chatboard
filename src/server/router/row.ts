import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { rows } from "../schema";
import { authProcedure } from "../utils";

const insertRowSchema = createInsertSchema(rows);
const selectRowSchema = createSelectSchema(rows);

export const row = {
	list: authProcedure
		.input(selectRowSchema.pick({ tableId: true }))
		.handler(async ({ context: { db }, input }) => {
			return db.query.rows.findMany({
				where: eq(rows.tableId, input.tableId),
			});
		}),
	create: authProcedure
		.input(insertRowSchema)
		.handler(async ({ context: { db }, input }) => {
			const [row] = await db.insert(rows).values(input).returning();
			return row;
		}),
	update: authProcedure
		.input(selectRowSchema)
		.handler(async ({ context: { db }, input }) => {
			const [row] = await db
				.update(rows)
				.set(input)
				.where(eq(rows.id, input.id))
				.returning();
			return row;
		}),
	delete: authProcedure
		.input(selectRowSchema.pick({ id: true }))
		.handler(async ({ context: { db }, input }) => {
			const [row] = await db
				.delete(rows)
				.where(eq(rows.id, input.id))
				.returning();
			return row;
		}),
};
