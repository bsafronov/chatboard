import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { Link } from "@tanstack/react-router";
import { Loader2, LucidePlus } from "lucide-react";
import { Suspense } from "react";
import { tableCollection } from "@/features/table/collection";
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

function ChatList() {
	const { data: chats } = useLiveSuspenseQuery((q) =>
		q
			.from({ table: tableCollection })
			.select(({ table: { id, name, createdAt, updatedAt } }) => ({
				id,
				name,
				createdAt,
				updatedAt,
			})),
	);

	return (
		<ul>
			{chats.map((chat) => (
				<li key={chat.id}>
					<Link
						to="/tables/$tableId"
						params={{ tableId: chat.id }}
						className="[*.active]:text-blue-500"
					>
						{chat.name}
					</Link>
				</li>
			))}
		</ul>
	);
}
