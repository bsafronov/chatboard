import type { ComponentProps } from "react";
import { SidebarInset } from "./sidebar";

export function Page(props: ComponentProps<typeof SidebarInset>) {
	return <SidebarInset {...props} />;
}
