import { LucideUploadCloud } from "lucide-react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { cn } from "../lib";
import { Card, CardContent } from "./card";

export function Dropzone(options: DropzoneOptions) {
	const { getRootProps, getInputProps, isDragActive } = useDropzone(options);

	return (
		<Card
			{...getRootProps()}
			className={cn(
				"cursor-pointer hover:bg-muted",
				isDragActive && "bg-muted",
			)}
		>
			<CardContent>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center">
					<LucideUploadCloud className="mb-2" />
					<p>Импорт из Excel</p>
					<span className="text-muted-foreground">
						Кликни здесь или перетащи, чтобы загрузить
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
