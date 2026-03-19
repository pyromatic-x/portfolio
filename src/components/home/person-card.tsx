"use client";

import { HOME_SOCIAL_LINKS } from "@/constants/home";
import { Button } from "@/components/ui/form/button";
import { AppearWrapper } from "@/components/appear-wrapper";
import { Card } from "@/components/ui/shared/card";

export const HomePersonCard = () => {
	return (
		<Card video="/avatar.mp4">
			<h2 className="text-2xl font-black uppercase mb-8">Андрей Тепляков</h2>
			<p className="mb-8">
				Делаю интерфейсы, которые хочется трогать. И код, в который не страшно
				заглянуть
			</p>
			<div className="flex gap-3 [&_svg]:size-6">
				{HOME_SOCIAL_LINKS.map(({ link, Icon }) => (
					<Button
						key={link}
						variant="ghost"
						size="icon"
						asLink
						href={link}
						target="_blank"
						className="pointer-events-auto"
					>
						<Icon />
					</Button>
				))}
			</div>
		</Card>
	);
};
