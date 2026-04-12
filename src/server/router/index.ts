import { eq } from "drizzle-orm";
import {
	columns,
	insertColumnSchema,
	insertRowSchema,
	insertTableSchema,
	rows,
	selectColumnSchema,
	selectRowSchema,
	TableSchema,
	tables,
} from "../schema";
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

export const getRows = authProcedure
	.input(selectRowSchema.pick({ tableId: true }))
	.handler(async ({ context: { db }, input }) => {
		return db.query.rows.findMany({
			where: eq(rows.tableId, input.tableId),
		});
	});

export const createRow = authProcedure
	.input(insertRowSchema)
	.handler(async ({ context: { db }, input }) => {
		const [row] = await db.insert(rows).values(input).returning();
		return row;
	});

export const deleteRow = authProcedure
	.input(selectRowSchema.pick({ id: true }))
	.handler(async ({ context: { db }, input }) => {
		const [row] = await db
			.delete(rows)
			.where(eq(rows.id, input.id))
			.returning();
		return row;
	});

export const updateRow = authProcedure
	.input(selectRowSchema)
	.handler(async ({ context: { db }, input }) => {
		const [row] = await db
			.update(rows)
			.set(input)
			.where(eq(rows.id, input.id))
			.returning();
		return row;
	});
