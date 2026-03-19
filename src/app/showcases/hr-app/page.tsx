import { Button } from "@/components/ui/form/button";
import { Card } from "@/components/ui/shared/card";
import { Section } from "@/components/ui/shared/section";
import {
	ArrowArcLeftIcon,
	GithubLogoIcon,
	GlobeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { StyledLink } from "../_components/styled-link";
import Image from "next/image";

const Link = () => (
	<StyledLink title="HR App" href="https://hr-app.pyromatic.ru" />
);

export default function Page() {
	return (
		<div className="min-h-screen w-full p-4 md:p-10 lg:p-20">
			<div className="w-full flex flex-col xl:flex-row gap-10 lg:gap-20 max-w-6xl mx-auto justify-center min-h-0">
				<div className="flex flex-col items-start justify-start h-full min-h-0 gap-16">
					<Button asLink href="/">
						<ArrowArcLeftIcon />
					</Button>

					<div className="rounded-md border-2 border-dashed border-text/40 px-4 py-3 text-white text-xl bg-text relative">
						Внимание! Этот проект - дитя vibe coding. В репозитории можно найти
						странные и непредвиденные решения.
					</div>

					<Section
						title={{
							top: "коротко о",
							bottom: "главном",
							primary: "bottom",
						}}
					>
						<p className="text-lg">
							<Link /> - сервис для создания, проведения и анализа опросов. Он
							задумывался как Self-Hosted решение для компаний вместо Google
							Forms и прочих, дабы HR могли в одном месте проводить опросы и их
							анализ, а не гонять данные между разными сервисами и Excel
							таблицами.
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
								Идея сервиса - сервис, где HR/менеджеры добавляют сотрудников,
								по необходимости разбивают их на команды. Создают опросы
								(поддерживается два вида - <u>одноразовые</u> и{" "}
								<u>повторяющиеся</u>) посредством продвинутого конструктора форм
								и назначают их конкретным людям/командам.
							</p>
							<p>
								В форму создания опроса уже встроены 13 типов вопросов -{" "}
								<b>Текстовый</b>, <b>Несколько вариантов</b>,{" "}
								<b>Шкала лайкерта</b>, <b>Ранжирование</b> и другие.
							</p>
							<p>
								В форме создания опроса добавлен чат с ИИ-помощником, который
								помогает в создании опроса относительно вашего запроса, и
								предлагает добавить конкретные вопросы.
							</p>
							<p>
								По окончанию опроса доступна ИИ-аналитика, которая подсвечивает
								проблемы, дает инсайты и рекомендации/советы.
							</p>
							<p>
								Сервис неистово вайбкодился. Примерно 90% кода была написано{" "}
								<b>Opus 4.5</b>, <b>GPT 5.3 Codex</b> и <b>Gemini 3 Pro</b>.
								Вайбкодинг был результатом личного интереса - а справятся ли? А
								насколько будет хорош код? Можно ли будет расширять сервис в
								дальнейшем?{" "}
								<span className="inline-flex gap-1">
									Ответы на эти вопросы - это уже совсем другая история...{" "}
									<Image
										src="/living-legend.png"
										alt="KANEVSKY"
										width={128}
										height={128}
										className="relative size-8 hover:scale-550 transition-transform"
									/>
								</span>
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
								Весь проект - единое <b>Next.js 16</b> приложение на{" "}
								<b>React 19</b>. На клиенте <b>TanStack React Query</b> для
								серверного состояния, <b>Zustand</b> для локального, формы -{" "}
								<b>React Hook Form</b> + <b>Zod</b>. UI собран из <b>shadcn</b>
							</p>
							<p>
								Данные хранятся в <b>PostgreSQL</b> (<b>Prisma</b> как ORM).
							</p>
							<p>
								AI-агенты общаются через OpenAI API со структурированным
								JSON-выводом.
							</p>
						</div>
					</Section>
				</div>
				<Card image="/made-by-me/hr.png">
					<h2 className="font-semibold text-2xl mb-4">HR App</h2>
					<div className="flex gap-3 [&_svg]:size-6">
						<Button
							variant="ghost"
							size="icon"
							asLink
							target="_blank"
							href="https://github.com/pyromatic-x/hr-app"
							className="pointer-events-auto"
						>
							<GithubLogoIcon />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							asLink
							href="https://hr-app.pyromatic.ru"
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
