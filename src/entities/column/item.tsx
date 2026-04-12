import { LucideCheck, LucideEdit, LucideX } from "lucide-react";
import { useState } from "react";
import type { Column } from "@/server";
import { Badge, Button, Input } from "@/shared/ui";
import { columnCollection } from "./collection";
import { typeToName } from "./const";

type Props = {
	column: Column;
};

export function ColumnItem({ column }: Props) {
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState(column.name);

	return (
		<div className="p-4 flex justify-between items-start gap-2">
			<div className="flex items-center gap-2">
				<Badge>{typeToName[column.type]}</Badge>
				<div className="flex items-center gap-1">
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
				</div>
			</div>

			<Button onClick={() => columnCollection.delete(column.id)}>
				Удалить
			</Button>
		</div>
	);
}
