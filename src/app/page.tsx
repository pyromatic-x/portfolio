import { HomeMadeByMe } from "@/components/home/made-by-me";
import { HomeContribution } from "@/components/home/contribution";
import { HomePersonCard } from "@/components/home/person-card";
import { HomeTechStack } from "@/components/home/tech-stack";
import { HomeContact } from "@/components/home/contact";
import { HomeStats } from "@/components/home/stats";
import { HomeHero } from "@/components/home/hero";

export default function Page() {
	return (
		<div className="min-h-screen w-full p-4 md:p-10 lg:p-20">
			<div className="w-full flex flex-col xl:flex-row gap-10 lg:gap-20 max-w-6xl mx-auto justify-center min-h-0">
				<HomePersonCard />
				<div className="flex flex-col items-start justify-start h-full min-h-0 gap-16">
					<HomeHero />
					<HomeStats />
					<HomeContribution />
					<HomeMadeByMe />
					<HomeTechStack />
					<HomeContact />

					<p>
						<span className="text-text/60">Задизайнил и разрабол</span>{" "}
						@pyromatic.
					</p>
				</div>
			</div>
		</div>
	);
}
