import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { orpc } from "@/shared/lib";

export function useUser() {
	const { data: user } = useSuspenseQuery(orpc.user.auth.queryOptions());
	if (!user) {
		throw redirect({
			to: "/login",
			search: { redirect: window.location.href },
		});
	}
	return user;
}
