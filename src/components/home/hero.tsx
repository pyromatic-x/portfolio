"use client";

import { AppearWrapper } from "@/components/appear-wrapper";

export const HomeHero = () => (
	<AppearWrapper>
		<h1 className="text-6xl lg:text-8xl font-black uppercase mb-4 relative z-1 pointer-events-none">
			Frontend <span className="text-text/50">developer</span>
		</h1>
		<p className="text-xl max-w-2xl">
			5 лет превращаю дизайн в работающие продукты. React, Next.js, TypeScript -
			основной стек. Остальное - по ситуации
		</p>
	</AppearWrapper>
);
