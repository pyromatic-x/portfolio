"use client";

import { useEffect } from "react";
import { ArrowArcLeftIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/form/button";
import { WavyBackground } from "@/components/wavy-background";
import { SafeAreaBackground } from "@/components/safe-area-background";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="h-screen w-screen flex items-center justify-center bg-[#ffd9f4] text-[#c02729]">
			<div className="z-1 relative flex flex-col gap-4 items-center">
				<h1 className="text-4xl lg:text-6xl font-bold uppercase">
					500:server-error
				</h1>
				<Button
					className="max-w-max size-16 lg:size-20 aspect-square border-2"
					asLink
					href="/"
				>
					<ArrowArcLeftIcon className="size-8 lg:size-14" />
				</Button>
			</div>
			<WavyBackground effect="wind" pointGap={10} lineColor="rgba(0,0,0,0.1)" />
			<SafeAreaBackground color="var(--background)" />
		</div>
	);
}
