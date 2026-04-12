import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/ui";
import { AppSidebar } from "@/widgets/app-sidebar";

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
			<SidebarInset>
				<div className="border-b p-2">
					<SidebarTrigger />
				</div>
				<div className="flex flex-col p-4 grow">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
