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
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/ui";

type Props = {
	onDelete: () => void;
};
export function TableDangerZone({ onDelete }: Props) {
	return (
		<Card className="border-destructive-foreground/20 border bg-destructive/5 shadow-destructive/10">
			<CardHeader>
				<CardTitle>Опасная зона</CardTitle>
			</CardHeader>
			<CardContent>
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
							<AlertDialogAction onClick={onDelete}>
								Продолжить
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardContent>
		</Card>
	);
}
