import { Button } from "@/components/ui/form/button";
import { Card } from "@/components/ui/shared/card";
import { Section } from "@/components/ui/shared/section";
import {
	ArrowArcLeftIcon,
	GithubLogoIcon,
	GlobeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { StyledLink } from "../_components/styled-link";

const Link = () => (
	<StyledLink title="Voxmeter" href="https://voxmeter.pyromatic.ru" />
);

export default function Page() {
	return (
		<div className="min-h-screen w-full p-4 md:p-10 lg:p-20">
			<div className="w-full flex flex-col-reverse xl:flex-row gap-10 lg:gap-20 max-w-6xl mx-auto justify-center min-h-0">
				<div className="flex flex-col items-start justify-start h-full min-h-0 gap-16">
					<Button asLink href="/">
						<ArrowArcLeftIcon />
					</Button>

					<Section
						title={{
							top: "коротко о",
							bottom: "главном",
							primary: "bottom",
						}}
					>
						<p className="text-lg">
							<Link /> дает возможность создавать не просто статичные
							презентации, а интерактивные, увлекательные презентации в которых
							хочется участвовать каждому. Участники могут подключаться с любых
							устройств с подключением к интернету. Проект направлен на две
							категории - бизнесс и образование. Провести митап, воркшоп,
							закрепить знания по лекции - с этим всем поможет <Link />
						</p>
					</Section>

					<Section
						title={{
							top: "как",
							bottom: "устроено",
							primary: "bottom",
						}}
					>
						<div className="text-lg flex flex-col gap-4">
							<p>
								Сердце <Link /> - мощный редактор с более чем 10 типами слайдов
								такими как <b>Облако слов</b>, <b>Ранжирование</b>,{" "}
								<b>Выбор ответа</b>, <b>Точка на изображении</b> и другими.
								Настройке подвергается практически всё - от реакций до цветов
								опций на слайде.
							</p>
							<p>
								Запуская презентацию участники могут подключиться по статичному
								восьмизначному коду или по QR коду с любого девайса. Сам
								ведущий, запускающий презентацию, строго не привязан с какого
								устройства ему вести презентацию.
							</p>
							<p>
								По окончании презентации <Link /> собирает результаты
								презентации в красивой и понятной форме, что позволяет проводить
								анализ и планировать дальнейшие направления в работе/учебе.
							</p>
							<p>
								В <Link /> встроены три вида подписок - <b>Free</b>,{" "}
								<b>Basic</b>, <b>Pro</b>. <b>Бесплатная подписка</b>{" "}
								ограничивает по количеству слайдов, презентаций и участников в
								месяц. <b>Базовая</b> и <b>Про</b> подписки же не имеют никаких
								лимитов. В свою очередь <b>Про</b> подписка открывает доступ к
								более детальной кастомизаций презентаций/слайдов.
							</p>
						</div>
					</Section>

					<Section
						title={{
							top: "под",
							bottom: "капотом",
							primary: "bottom",
						}}
					>
						<div className="text-lg flex flex-col gap-4">
							<p>
								<Link /> является monorepo на <b>yarn Workspaces</b> состоящим
								из 3 сервисов:
								<ul className="list-disc [&_li]:ml-8">
									<li>
										Frontend - <b>Next.js</b>
									</li>
									<li>
										Backend - <b>NestJS</b>
									</li>
									<li>
										Admin - <b>React + Vite</b>
									</li>
								</ul>
							</p>
							<p>
								<b>Frontend</b> - построен на <b>Tanstack Query</b>,{" "}
								<b>Radix UI</b>, <b>Tailwind</b>.
							</p>
							<p>
								<b>Backend</b> - отдает <b>REST</b> эндпоинты и поддерживает{" "}
								<b>Websockets</b>. <b>Websockets</b> используются для
								совместного редактирования презентаций, а так же для проведения
								презентаций. В качестве базы данных используется <b>MySQL</b> +{" "}
								<b>Prisma ORM</b>
							</p>
							<p>
								<b>Admin</b> - работает за счёт <b>TanStack Query</b>,{" "}
								<b>TanStack Router</b>, <b>shadcn</b>. За данными ходит не к
								общим эндпоинтам, а к отдельным (админским) контроллерам{" "}
								<b>NestJS</b>
							</p>
						</div>
					</Section>
				</div>
				<Card image="/made-by-me/voxmeter.svg">
					<h2 className="font-semibold text-2xl mb-4">Voxmeter</h2>
					<div className="flex gap-3 [&_svg]:size-6">
						<Button
							tooltip="Приватный репозиторий. Проект активно развивается и не является демо проектом"
							variant="ghost"
							size="icon"
							className="pointer-events-auto z-1 hover:[&_svg]:scale-100 opacity-50"
						>
							<GithubLogoIcon />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							asLink
							href="https://voxmeter.pyromatic.ru"
							target="_blank"
							className="pointer-events-auto animate-bounce"
						>
							<GlobeIcon />
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}
