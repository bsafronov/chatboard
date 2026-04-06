import { eq } from "drizzle-orm";
import {
	columns,
	insertColumnSchema,
	insertTableSchema,
	selectColumnSchema,
	TableSchema,
	tables,
} from "@/db/schema";
import { authProcedure, baseProcedure } from "../utils";

export const getTables = authProcedure.handler(
	async ({ context: { db, user } }) => {
		return db.query.tables.findMany({
			where: (t) => eq(t.createdById, user.id),
		});
	},
);

export const getUser = baseProcedure.handler(async ({ context: { user } }) => {
	return user;
});

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

export const getColumns = authProcedure
	.input(selectColumnSchema.pick({ tableId: true }))
	.handler(async ({ context: { db }, input }) => {
		return db.query.columns.findMany({
			where: (c) => eq(c.tableId, input.tableId),
		});
	});

export const createColumn = authProcedure
	.input(insertColumnSchema)
	.handler(async ({ context: { db }, input }) => {
		const [column] = await db.insert(columns).values(input).returning();
		return column;
	});

export const deleteColumn = authProcedure
	.input(selectColumnSchema.pick({ id: true }))
	.handler(async ({ context: { db }, input }) => {
		const [column] = await db
			.delete(columns)
			.where(eq(columns.id, input.id))
			.returning();
		return column;
	});

export const updateColumn = authProcedure
	.input(selectColumnSchema)
	.handler(async ({ context: { db }, input }) => {
		const [column] = await db
			.update(columns)
			.set(input)
			.where(eq(columns.id, input.id))
			.returning();
		return column;
	});
