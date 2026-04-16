import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../lib";

export function Loader({
	className,
	...props
}: ComponentProps<typeof Loader2>) {
	return <Loader2 className={cn("animate-spin", className)} {...props} />;
}
