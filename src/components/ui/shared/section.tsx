"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AppearWrapper } from "@/components/appear-wrapper";

interface Props extends PropsWithChildren {
	title: {
		primary: "top" | "bottom";
		top: string;
		bottom: string;
	};
}

export const Section = ({ title, children }: Props) => (
	<AppearWrapper className="w-full min-w-0">
		<h2 className="text-5xl lg:text-7 font-black uppercase mb-4 relative z-1 pointer-events-none">
			<span className={cn([title.primary === "bottom" && "text-text/50"])}>
				{title.top}
			</span>
			<br />{" "}
			<span className={cn([title.primary === "top" && "text-text/50"])}>
				{title.bottom}
			</span>
		</h2>
		{children}
	</AppearWrapper>
);
