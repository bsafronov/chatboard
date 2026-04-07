import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { Link } from "@tanstack/react-router";
import { tableCollection } from "../table/collection";
import { ChatItem } from "./item";

export function ChatList() {
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
		<ul className="flex flex-col gap-1">
			{chats.map((chat) => (
				<li key={chat.id}>
					<Link to="/tables/$tableId" params={{ tableId: chat.id }}>
						{({ isActive }) => (
							<ChatItem
								title={chat.name}
								lastMessageAt={chat.updatedAt ?? chat.createdAt}
								lastMessage="Hello"
								isActive={isActive}
							/>
						)}
					</Link>
				</li>
			))}
		</ul>
	);
}
