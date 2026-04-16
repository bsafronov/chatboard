import { LucideUploadCloud } from "lucide-react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { cn } from "../lib";
import { Card, CardContent } from "./card";
import { Loader } from "./loader";

type Props = {
	isLoading?: boolean;
	title: string;
} & DropzoneOptions;
export function Dropzone({ title, isLoading, ...options }: Props) {
	const { getRootProps, getInputProps, isDragActive } = useDropzone(options);

	return (
		<Card
			{...getRootProps()}
			className={cn(
				"cursor-pointer hover:bg-muted",
				isDragActive && "bg-muted",
				isLoading && "pointer-events-none",
			)}
		>
			<CardContent>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center">
					<div className="mb-2">
						{isLoading ? <Loader /> : <LucideUploadCloud />}
					</div>
					<h5>{title}</h5>
					<span className="text-muted-foreground">
						{isLoading
							? "Загрузка..."
							: "Кликни здесь или перетащи, чтобы загрузить"}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
