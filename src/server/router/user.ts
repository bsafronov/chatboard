import { baseProcedure } from "../utils";

export const user = {
	auth: baseProcedure.handler(({ context: { user } }) => user),
};
