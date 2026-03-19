"use client";

import { HOME_SOCIAL_LINKS } from "@/constants/home";
import { Button } from "@/components/ui/form/button";
import { AppearWrapper } from "@/components/appear-wrapper";
import type { PropsWithChildren } from "react";
import Image from "next/image";

type Props = PropsWithChildren &
	(
		| {
				video: string;
		  }
		| {
				image: string;
		  }
	);

export const Card = ({ children, ...media }: Props) => {
	return (
		<AppearWrapper className="xl:sticky pointer-events-none xl:top-20 flex flex-col gap-2 py-5 px-4 items-center justify-center rounded-md bg-background/60 ring-4 ring-text/20 min-w-[300px] h-max text-center">
			<div className="overflow-hidden aspect-square lg:max-w-[240px] mb-3 relative z-1">
				{"video" in media && (
					<video
						src={media.video}
						autoPlay
						muted
						loop
						playsInline
						controls={false}
						className="object-cover border-4 border-text/20 rounded-md object-center w-full h-full min-h-[240px]"
					/>
				)}
				{"image" in media && (
					<Image
						src={media.image}
						alt=""
						width={480}
						height={480}
						className="object-cover border-4 border-text/20 rounded-md object-center w-full h-full min-h-[240px]"
					/>
				)}
			</div>
			{children}
		</AppearWrapper>
	);
};
