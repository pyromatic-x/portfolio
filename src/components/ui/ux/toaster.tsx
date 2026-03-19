"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

import {
	InfoIcon,
	SealCheckIcon,
	SealWarningIcon,
	SpinnerGapIcon,
} from "@phosphor-icons/react/dist/ssr";

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme={"light"}
			className="toaster group"
			icons={{
				success: <SealCheckIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <SealWarningIcon className="size-4" />,
				error: <SealWarningIcon className="size-4" />,
				loading: <SpinnerGapIcon className="size-4 animate-spin" />,
			}}
			toastOptions={{
				classNames: {
					default:
						"shadow-[0_4px_20px_rgba(0,0,0,0.3)]! bg-text! text-white! border-transparent!",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
