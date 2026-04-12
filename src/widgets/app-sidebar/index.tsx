import { Link } from "@tanstack/react-router";
import { Loader2, LucidePlus } from "lucide-react";
import { Suspense } from "react";
import {
	Sidebar as SidebarContainer,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	ThemeToggle,
} from "@/shared/ui";
import { ChatList } from "./chat-list";
import { NavUser } from "./nav-user";

export function AppSidebar() {
	return (
		<SidebarContainer variant="inset">
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
		</SidebarContainer>
	);
}
