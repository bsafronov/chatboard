import { Link } from "@tanstack/react-router";
import { Loader2, LucidePlus } from "lucide-react";
import { Suspense } from "react";
import { ChatList } from "@/features/chat/list";
import { NavUser } from "./nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";
import { ThemeToggle } from "./ui/theme-toggle";

export function AppSidebar() {
	return (
		<Sidebar variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							render={
								<Link to="/tables/new">
									<LucidePlus />
									Создать таблицу
								</Link>
							}
						/>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<Suspense fallback={<Loader2 className="animate-spin" />}>
					<ChatList />
				</Suspense>
			</SidebarContent>
			<SidebarFooter>
				<ThemeToggle />
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
