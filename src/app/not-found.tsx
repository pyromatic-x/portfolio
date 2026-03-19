"use client";

import { SafeAreaBackground } from "@/components/safe-area-background";
import { Button } from "@/components/ui/form/button";
import { ArrowArcLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
	return (
		<div className="h-screen w-screen flex items-center justify-center bg-[#ffd9f4] text-[#c02729]">
			<div className="z-1 relative flex flex-col gap-4 items-center">
				<h1 className="text-4xl lg:text-6xl font-bold uppercase">
					404:not-found
				</h1>
				<Button
					className="max-w-max size-16 lg:size-20 aspect-square border-2"
					asLink
					href="/"
				>
					<ArrowArcLeftIcon className="size-8 lg:size-14" />
				</Button>
			</div>
			<SafeAreaBackground color="var(--background)" />
		</div>
	);
}
