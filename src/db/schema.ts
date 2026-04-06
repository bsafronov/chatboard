import { relations, sql } from "drizzle-orm";
import {
	boolean,
	index,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const id = uuid("id").primaryKey().default(sql`gen_random_uuid()`);
export const createdAt = timestamp("created_at", { withTimezone: true })
	.defaultNow()
	.notNull();
export const updatedAt = timestamp("updated_at", { withTimezone: true });
export const createdById = text("created_by_id")
	.notNull()
	.references(() => users.id);
export const updatedById = text("updated_by_id").references(() => users.id);

export const base = {
	id,
	createdAt,
	updatedAt,
	createdById,
	updatedById,
};

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const sessions = pgTable(
	"sessions",
	{
		id: text("id").primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
	},
	(table) => [index("sessions_userId_idx").on(table.userId)],
);

export const accounts = pgTable(
	"accounts",
	{
		id: text("id").primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("accounts_userId_idx").on(table.userId)],
);

export const verifications = pgTable(
	"verifications",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("verifications_identifier_idx").on(table.identifier)],
);

export const tables = pgTable(
	"tables",
	{
		...base,
		name: text("name").notNull(),
	},
	(table) => [index("tables_created_at_idx").on(table.id, table.createdAt)],
);

export const columnTypes = pgEnum("column_type", [
	"string",
	"number",
	"date",
	"boolean",
]);

export const columns = pgTable(
	"columns",
	{
		...base,
		tableId: uuid("table_id")
			.notNull()
			.references(() => tables.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		type: columnTypes("type").notNull().default("string"),
		required: boolean("required").notNull().default(true),
	},
	(t) => [index("columns_table_id_idx").on(t.tableId)],
);

export const rows = pgTable(
	"rows",
	{
		...base,
		tableId: uuid("table_id")
			.notNull()
			.references(() => tables.id, { onDelete: "cascade" }),
		data: jsonb("data").notNull().$type<Record<string, unknown>>(),
	},
	(t) => [index("rows_table_id_idx").on(t.tableId)],
);

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	users: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	users: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}));

export const tablesRelations = relations(tables, ({ one, many }) => ({
	createdBy: one(users, {
		fields: [tables.createdById],
		references: [users.id],
	}),
	updatedBy: one(users, {
		fields: [tables.updatedById],
		references: [users.id],
	}),
	columns: many(columns),
	rows: many(rows),
}));

export const columnsRelations = relations(columns, ({ one }) => ({
	createdBy: one(users, {
		fields: [columns.createdById],
		references: [users.id],
	}),
	updatedBy: one(users, {
		fields: [columns.updatedById],
		references: [users.id],
	}),
	table: one(tables, {
		fields: [columns.tableId],
		references: [tables.id],
	}),
}));

export const rowsRelations = relations(rows, ({ one }) => ({
	createdBy: one(users, {
		fields: [rows.createdById],
		references: [users.id],
	}),
	updatedBy: one(users, {
		fields: [rows.updatedById],
		references: [users.id],
	}),
	table: one(tables, {
		fields: [rows.tableId],
		references: [tables.id],
	}),
}));

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type Table = typeof tables.$inferSelect;
export type TableInsert = typeof tables.$inferInsert;
export type Column = typeof columns.$inferSelect;
export type ColumnInsert = typeof columns.$inferInsert;
export type Row = typeof rows.$inferSelect;
export type RowInsert = typeof rows.$inferInsert;
export type ColumnType = (typeof columnTypes.enumValues)[number];

export const TableSchema = createSelectSchema(tables);
export const insertTableSchema = createInsertSchema(tables);
export const insertColumnSchema = createInsertSchema(columns);
export const selectColumnSchema = createSelectSchema(columns);
