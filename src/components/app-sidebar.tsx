import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "./ui/sidebar";

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>Header</SidebarHeader>
			<SidebarContent>Content</SidebarContent>
			<SidebarFooter>Footer</SidebarFooter>
		</Sidebar>
	);
}
