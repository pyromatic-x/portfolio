"use client";

import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { SafeAreaBackground } from "@/components/safe-area-background";
import { Toaster } from "@/components/ui/ux/toaster";
import { TooltipProvider } from "@/components/ui/ux/tooltip";
import { WavyBackground } from "@/components/wavy-background";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TooltipProvider>
				<WavyBackground
					effect="wind"
					pointGap={20}
					lineColor="rgba(0,0,0,0.09)"
					mouseInteraction={{
						type: "ripple",
						maxRadius: 300,
						speed: 0.0005,
					}}
				/>
				<div className="w-full h-full flex items-center justify-center min-w-0 min-h-0">
					{children}
				</div>
				<Toaster
					position="top-center"
					toastOptions={{
						classNames: {
							default:
								"shadow-[0_4px_20px_rgba(0,0,0,0.3)]! bg-text! text-background! border-transparent!",
						},
					}}
				/>

				<SafeAreaBackground color="var(--background)" />
			</TooltipProvider>
			<YandexMetrika />
		</>
	);
}
