import Image from "next/image";
import { Section } from "../../components/ui/shared/section";
import { HOME_MADE_BY_ME } from "@/constants/home";
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/ux/carousel";
import { Button } from "@/components/ui/form/button";

export const HomeMadeByMe = () => {
	return (
		<Section
			title={{
				primary: "top",
				top: "Сделано",
				bottom: "мной",
			}}
		>
			<div className="mt-4 relative -left-8 w-[calc(100vw+16px)] lg:left-0 lg:w-full">
				<Carousel
					className="w-full lg:w-auto"
					opts={{
						loop: true,
					}}
				>
					<CarouselContent className="lg:w-full ml-0 px-4">
						{HOME_MADE_BY_ME.map((t) => (
							<CarouselItem
								key={t.title}
								className="py-1 pr-0 lg:pr-5 md:basis-1/2"
							>
								<div className="select-none bg-background/70 p-3 w-full gap-2 flex flex-col h-full ring-2 ring-text/50 rounded-md">
									<Image
										src={t.image}
										alt=""
										width={300}
										height={300}
										className="rounded-md w-full aspect-square object-cover mb-4 shadow-xl"
									/>
									<h4 className="font-semibold text-center text-3xl">
										{t.title}
									</h4>
									<p className="mb-6">{t.description}</p>
									<Button asLink href={t.link}>
										Подробнее
									</Button>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className="hidden lg:block absolute top-0 left-0 w-5 h-full bg-[linear-gradient(90deg,hsla(0,0%,7%,.7),#FFD9F4_0,transparent_100%)]" />
					<div className="hidden lg:block absolute top-0 right-0 w-5 h-full bg-[linear-gradient(-90deg,hsla(0,0%,7%,.7),#FFD9F4_0,transparent_100%)]" />

					<CarouselPrevious className="hidden lg:flex" />
					<CarouselNext className="hidden lg:flex" />

					<CarouselDots className="-bottom-6 lg:hidden" />
				</Carousel>
			</div>
		</Section>
	);
};
