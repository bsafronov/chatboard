import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_protected")({
	component: RouteComponent,
	loader: async ({ location, context: { orpc, queryClient } }) => {
		const user = await queryClient.ensureQueryData(orpc.getUser.queryOptions());
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
			<main className="grow flex flex-col">
				<div className="border-b p-2">
					<SidebarTrigger />
				</div>
				<div className="flex flex-col p-4 grow">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	);
}
