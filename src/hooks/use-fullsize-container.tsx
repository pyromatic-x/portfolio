"use client";

import { useRef, type ReactNode } from "react";
import { useDimensions } from "./use-dimensions";

export const FullSizeContainer = ({
	children,
}: {
	children: (width: number, height: number) => ReactNode;
}) => {
	const ref = useRef<HTMLDivElement | null>(null);

	const [width, height] = useDimensions(ref);

	return (
		<div
			ref={ref}
			style={{
				width: "100%",
				height: "100%",
				isolation: "isolate",
			}}
		>
			{children(width, height)}
		</div>
	);
};
