"use client";

import { FullSizeContainer } from "@/hooks/use-fullsize-container";
import { Section } from "../../components/ui/shared/section";
import { WordCloud, type Word } from "./word-cloud/word-cloud";
import { HOME_TECH_STACK } from "@/constants/home";
import { useDevice } from "@/hooks/use-device";

export const HomeTechStack = () => {
	const { isMobile } = useDevice();

	const _data = HOME_TECH_STACK.data.map((t) => ({
		...t,
		value: isMobile ? t.value / 30 : t.value,
	}));

	return (
		<Section
			title={{
				primary: "top",
				top: "Стек",
				bottom: "технологий",
			}}
		>
			<div className="w-full min-w-0 min-h-0 h-[400px] pointer-events-none">
				<FullSizeContainer>
					{(width, height) => (
						<WordCloud
							data={_data}
							width={width}
							height={height}
							colors={HOME_TECH_STACK.colors}
							fontFamily='Jost, "Jost Fallback"'
						/>
					)}
				</FullSizeContainer>
			</div>
		</Section>
	);
};
