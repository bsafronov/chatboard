import type { ComponentProps } from "react";
import { cn } from "../lib";

export function Section({ className, ...props }: ComponentProps<"section">) {
	return (
		<section
			className={cn(
				"flex flex-col gap-4 p-4 grow w-full min-h-0 overflow-y-auto",
				className,
			)}
			{...props}
		/>
	);
}
