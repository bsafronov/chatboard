import { Link } from "@tanstack/react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/shared/ui";
import { useTableQuery } from "./use-table-query";

type Props = {
	children?: React.ReactNode;
	tableId: string;
};
export function TableBreadcrumb({ tableId, children }: Props) {
	const { data: table } = useTableQuery({ tableId });

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink
						render={
							<Link to="/tables/$tableId" params={{ tableId }}>
								{table.name}
							</Link>
						}
					/>
				</BreadcrumbItem>
				{children && <BreadcrumbSeparator />}
				{children}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
