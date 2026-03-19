import { cn } from "@/lib/utils";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ComponentProps } from "react";

export const StyledLink = ({
	title,
	className,
	...rest
}: ComponentProps<typeof Link>) => (
	<Link
		target="blank"
		className={cn([
			"underline relative inline-flex gap-1 items-center pointer-events-auto transition-opacity hover:opacity-50",
			className,
		])}
		{...rest}
	>
		{title}
		<ArrowSquareOutIcon />
	</Link>
);
