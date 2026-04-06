import { LucideCheck, LucideEdit, LucideX } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Column } from "@/db/schema";
import { columnCollection } from "./collection";

type Props = {
	column: Column;
};

export function ColumnItem({ column }: Props) {
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState(column.name);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-1">
					{editing ? (
						<>
							<Input value={name} onChange={(e) => setName(e.target.value)} />
							<Button
								size="icon-sm"
								variant="ghost"
								onClick={() => {
									columnCollection.update(column.id, (d) => {
										d.name = name;
									});
									setEditing(false);
								}}
							>
								<LucideCheck />
							</Button>
							<Button
								size="icon-sm"
								variant="ghost"
								onClick={() => {
									setEditing(false);
									setName(column.name);
								}}
							>
								<LucideX />
							</Button>
						</>
					) : (
						<>
							<span>{column.name}</span>
							<Button
								size="icon-sm"
								variant="ghost"
								onClick={() => setEditing((prev) => !prev)}
							>
								<LucideEdit />
							</Button>
						</>
					)}
				</CardTitle>
			</CardHeader>
			<CardFooter>
				<Button onClick={() => columnCollection.delete(column.id)}>
					Удалить
				</Button>
			</CardFooter>
		</Card>
	);
}
