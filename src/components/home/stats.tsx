"use client";

import { AppearWrapper } from "@/components/appear-wrapper";

export const HomeStats = () => {
	return (
		<AppearWrapper>
			<div className="flex gap-3 lg:gap-5">
				<div>
					<h3 className="font-semibold text-3xl lg:text-6xl">+5</h3>
					<p className="text-base lg:text-xl text-text/60 whitespace-nowrap">
						лет опыта
					</p>
				</div>
				<div>
					<h3 className="font-semibold text-3xl lg:text-6xl">+800к</h3>
					<p className="text-base lg:text-xl text-text/60 whitespace-nowrap">
						пользователей продуктов
					</p>
				</div>
				<div>
					<h3 className="font-semibold text-3xl lg:text-6xl">+2000</h3>
					<p className="text-base lg:text-xl text-text/60 whitespace-nowrap">
						коммитов
					</p>
				</div>
			</div>
		</AppearWrapper>
	);
};
