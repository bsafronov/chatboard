import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarProvider } from "@/shared/ui";
import { AppSidebar } from "@/widgets/app-sidebar";

export const Route = createFileRoute("/_protected")({
	component: RouteComponent,
	loader: async ({ location, context: { orpc, queryClient } }) => {
		const user = await queryClient.ensureQueryData(
			orpc.user.auth.queryOptions(),
		);
		if (!user) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}
	},
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<Outlet />
		</SidebarProvider>
	);
}
