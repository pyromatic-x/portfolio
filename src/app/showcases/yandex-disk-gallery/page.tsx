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
	<StyledLink
		title="Yandex Disk Gallery"
		href="https://disk-showcase.pyromatic.ru"
	/>
);

export default function Page() {
	return (
		<div className="min-h-screen w-full p-4 md:p-10 lg:p-20">
			<div className="w-full flex flex-col xl:flex-row gap-10 lg:gap-20 max-w-6xl mx-auto justify-center min-h-0">
				<div className="flex flex-col items-start justify-start h-full min-h-0 gap-16">
					<Button asLink href="/">
						<ArrowArcLeftIcon />
					</Button>

					<div className="rounded-md border-2 border-dashed border-text/40 px-4 py-3  bg-text relative">
						<p className="text-lg text-background/80">
							Приложение родилось с классичегого:
						</p>
						<p className="text-2xl text-white">“Андрей, тыж программист...”</p>
					</div>

					<Section
						title={{
							top: "коротко о",
							bottom: "главном",
							primary: "bottom",
						}}
					>
						<p className="text-lg">
							<Link /> — обёртка над Яндекс.Диск API была изобретена для моих
							друзей и меня. Так как мы часто куда-то ходим, ездим, делаем фото,
							записываем видео, то нам нужно было удобное место, чтобы делиться
							между собой этими файлами. Хранить всё в телеграм можно, но искать
							давние фото не удобно. Перешли в Яндекс.Диск, но визуал и
							функционал нас не очень устраивал. Тогда то с уст и сошла фраза
							"Андрей, тыж программист..."
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
							<p>Авторизация работает через Telegram бота с white list'ом.</p>
							<p>
								Контент поделен на две сущности - папки и файлы (все как и в
								Yandex.Disk).
							</p>
							<p>
								Папкам можно добавлять теги, сортировать их, искать по различным
								полям. Файлы внутри папок располагаются сеткой, сами файлы можно
								перемещать через Drag&Drop
							</p>
							<p>
								Файлы загружаются непосредственно в Yandex.Disk, либо вставляя
								ссылку на файл, либо прекрепляя файлы как есть.
							</p>
							<p>
								Забавы ради были добавлены графики со статистикой - кто, сколько
								и куда загружает файлы.
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
								Приложение целиком на <b>Next.js 15</b> с <b>React 19</b> на
								Server Actions.
							</p>
							<p>
								Метаданные папок, файлов и пользователей хранятся в{" "}
								<b>MongoDB</b>, а сами файлы живут на Яндекс.Диске и
								проксируются через API-роуты с кешированием
							</p>
							<p>
								Серверное состояние кешируется через <b>TanStack React Query</b>
								, формы — <b>React Hook Form</b> + <b>Zod</b>
							</p>
							<p>
								Стилизация — <b>shadcn</b> на <b>Radix</b>, перетаскивание
								файлов — <b>DnD Kit</b>, графики — <b>Recharts</b>
							</p>
						</div>
					</Section>
				</div>
				<Card image="/made-by-me/ya-disk.png">
					<h2 className="font-semibold text-2xl mb-4">Yandex Disk Gallery</h2>
					<div className="flex gap-3 [&_svg]:size-6">
						<Button
							variant="ghost"
							size="icon"
							asLink
							target="_blank"
							href="https://github.com/pyromatic-x/ya-disk-gallery"
							className="pointer-events-auto"
						>
							<GithubLogoIcon />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							asLink
							href="https://disk-showcase.pyromatic.ru"
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
