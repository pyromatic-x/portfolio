import { HOME_CONTRIBUTION_CASES } from "@/constants/home";
import { Section } from "../../components/ui/shared/section";

export const HomeContribution = () => {
	return (
		<Section
			title={{
				primary: "bottom",
				top: "Недавний",
				bottom: "вклад",
			}}
		>
			<div className="w-full min-w-0 mt-4 flex flex-col gap-4">
				{HOME_CONTRIBUTION_CASES.map((t) => (
					<div key={t.title}>
						<h4 className="font-semibold text-2xl">{t.title}</h4>
						<p className="text-xl max-w-xl text-text/80">{t.description}</p>
					</div>
				))}
			</div>
		</Section>
	);
};
