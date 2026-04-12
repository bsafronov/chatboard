import { ORPCError, os } from "@orpc/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { User } from "better-auth";
import { auth } from "./auth";
import { db } from "./db";

type OSContext = {
	db?: typeof db;
	user?: User | null;
};

const baseMiddleware = os.$context<OSContext>().middleware(async ({ next }) => {
	const session = await auth.api.getSession({
		headers: getRequestHeaders(),
	});
	const isDev = process.env.NODE_ENV === "development";

	if (isDev) {
		await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
	}

	return next({
		context: {
			db,
			user: session?.user ?? null,
		},
	});
});

export const baseProcedure = os.use(baseMiddleware);
export const authProcedure = baseProcedure.use(({ context, next }) => {
	if (!context.user) {
		throw new ORPCError("UNAUTHORIZED");
	}

	return next({
		context: {
			...context,
			user: context.user,
		},
	});
});
