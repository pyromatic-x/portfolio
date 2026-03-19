import { Button } from "@/components/ui/form/button";
import { Card } from "@/components/ui/shared/card";
import { Section } from "@/components/ui/shared/section";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/ux/tooltip";
import {
	ArrowArcLeftIcon,
	GithubLogoIcon,
	GlobeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { StyledLink } from "../_components/styled-link";

const Link = () => (
	<StyledLink title="Spotify Clone" href="https://sptf.pyromatic.ru" />
);

export default function Page() {
	return (
		<div className="min-h-screen w-full p-4 md:p-10 lg:p-20">
			<div className="w-full flex flex-col xl:flex-row gap-10 lg:gap-20 max-w-6xl mx-auto justify-center min-h-0">
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
						<div className="text-lg flex flex-col gap-4">
							<p>
								Сам по себе Spotify представлять не нужно, а <Link /> является
								его клоном. Так как дизайн у Spotify меняется очень часто, то за
								основу был взят дизайн на 01.07.2025.
							</p>
							<p>
								Может встать вопрос - а <b>зачем</b> вообще этот клон?{" "}
								<s>Просто я очень люблю музыку</s> Проект не преследует никаких
								коммерческих целей, разработан он лишь как Showcase, показать
								свои навыки
							</p>
						</div>
					</Section>

					<Section
						title={{
							top: "fun",
							bottom: "fact",
							primary: "bottom",
						}}
					>
						<p className="text-lg">
							Изначально архитектура закладывалась под использование одних лишь{" "}
							<b>Websockets</b> дабы сделать поддержку воспоизведения с разных
							устройств, но в конце я осознал, что в Showcase приложении с
							одного тестового аккаунта смогут подключиться сразу несколько
							человек и будет <s>баг</s> беда. Поэтому пришлось отказаться от
							этой идеи и переписать всё на REST.
						</p>
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
								Три раздельных сервиса под свои задачи - <b>Frontend</b>,
								<b>Backend</b>, <b>Media Service</b>
							</p>
							<p>
								<b>Frontend</b> - <b>React</b> + <b>Vite</b>,<b>Mongoose</b>.
								Авторизация через <b>JWT</b> в httpOnly-куках.
							</p>
							<p>
								<b>Backend</b> - <b>NestJS</b>, <b>Mongoose</b>. Состояние
								воспроизводимого трека/альбома пользователя живет на сервере, а
								не на клиенте.
							</p>
							<p>
								<b>Media-сервис</b> - отдельный <b>NestJS</b>-микросервис для
								раздачи изображений и аудио. Картинки на лету обрабатываются
								через <b>Sharp</b> - ресайз, сжатие, конвертация в JPEG.
								Аудиофайлы стримятся с поддержкой Range-запросов
							</p>
						</div>
					</Section>
				</div>
				<Card image="/made-by-me/spotify.webp">
					<h2 className="font-semibold text-2xl mb-4">Spotify Clone</h2>
					<div className="flex gap-3 [&_svg]:size-6">
						<Button
							tooltip="Пока открыт только Frontend репозиторий"
							variant="ghost"
							size="icon"
							asLink
							target="_blank"
							href="https://github.com/pyromatic-x/spotify-clone-frontend"
							className="pointer-events-auto"
						>
							<GithubLogoIcon />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							asLink
							href="https://sptf.pyromatic.ru"
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
