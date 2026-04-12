import { LucideSendHorizontal } from "lucide-react";
import { Button, Input } from "@/shared/ui";

export function RowCreateAiInput() {
	return (
		<div className="flex items-center gap-1 grow">
			<Input placeholder="От меня что требуется?" />
			<Button size="icon-lg" variant="ghost">
				<LucideSendHorizontal />
			</Button>
		</div>
	);
}
