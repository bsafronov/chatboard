import type { ComponentProps } from "react";
import { cn } from "../lib";
import { SidebarInset } from "./sidebar";

export function Page({
	className,
	...props
}: ComponentProps<typeof SidebarInset>) {
	return <SidebarInset className={cn("relative", className)} {...props} />;
}
