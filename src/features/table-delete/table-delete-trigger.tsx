import { tableCollection } from "@/entities/table";
import type { Table } from "@/server";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
} from "@/shared/ui";

type Props = {
	tableId: Table["id"];
	onSuccess: (prevTable?: Table) => void;
};

export function TableDeleteTrigger({ tableId, onSuccess }: Props) {
	const handleDelete = () => {
		const keys = [...tableCollection.state.keys()];
		const prevKey = keys.indexOf(tableId) - 1;
		const prev = tableCollection.state.get(keys[prevKey]);
		tableCollection.delete(tableId);
		onSuccess(prev);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger
				render={<Button variant={"destructive"}>Удалить таблицу</Button>}
			/>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Вы уверены, что хотите удалить таблицу?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Все данные будут удалены
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Отменить</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>
						Продолжить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
