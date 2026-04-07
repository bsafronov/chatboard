import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
	title: string;
	avatar?: string;
	lastMessageAt: Date;
	lastMessage?: string;
	isActive?: boolean;
};

export function ChatItem({
	title,
	avatar,
	lastMessage,
	lastMessageAt,
	isActive,
}: Props) {
	return (
		<div
			className={cn(
				"flex rounded-md gap-2 items-center p-2 overflow-hidden border border-transparent hover:border-muted",
				isActive && "bg-muted",
			)}
		>
			<Avatar>
				<AvatarImage src={avatar} />
				<AvatarFallback>{title.slice(0, 2).toUpperCase()}</AvatarFallback>
			</Avatar>
			<div className="flex flex-col grow overflow-hidden">
				<h5 className="truncate text-sm">{title}</h5>
				<div className="flex justify-between gap-1 text-xs items-center text-muted-foreground">
					<span className="truncate">{lastMessage}</span>
					<span className="shrink-0">{format(lastMessageAt, "HH:mm")}</span>
				</div>
			</div>
		</div>
	);
}
