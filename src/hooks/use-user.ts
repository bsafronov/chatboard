import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { orpc } from "@/orpc/client";

export function useUser() {
	const { data: user } = useSuspenseQuery(orpc.getUser.queryOptions());
	if (!user) {
		throw redirect({
			to: "/login",
			search: { redirect: window.location.href },
		});
	}
	return user;
}
