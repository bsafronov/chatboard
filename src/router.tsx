import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { LucideLoader2 } from "lucide-react";
import { routeTree } from "./routeTree.gen";
import { orpc, queryClient } from "./shared/lib";

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,
		context: {
			orpc,
			queryClient,
		},
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultPendingComponent: () => <LucideLoader2 className="animate-spin" />,
		defaultNotFoundComponent: () => <div>404</div>,
	});

	setupRouterSsrQueryIntegration({ router, queryClient });

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
