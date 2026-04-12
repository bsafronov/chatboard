import type { ComponentProps } from "react";
import { cn } from "../lib";
import { SidebarTrigger } from "./sidebar";

export function Header({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	return (
		<div className="border-b p-2 gap-2 flex">
			<SidebarTrigger />
			{children && (
				<div className={cn("flex items-center gap-2")} {...props}>
					{children}
				</div>
			)}
		</div>
	);
}

export function HeaderTitle({ className, ...props }: ComponentProps<"h1">) {
	return (
		<h5 className={cn("text-muted-foreground text-sm", className)} {...props} />
	);
}
