import type { Word } from "@/components/home/word-cloud/word-cloud";
import {
	EnvelopeSimpleIcon,
	GithubLogoIcon,
	TelegramLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

export const HOME_CONTRIBUTION_CASES = [
	{
		title: "Begemot",
		description:
			"Поддержка текущего Nuxt-приложения и разработка версии на Next.js с новым дизайном",
	},
	{
		title: "Цифровой рубль",
		description:
			"Проектирование ядра цифрового рубля и интеграция в банковский контур",
	},
	{
		title: "Внутренние сервисы банка",
		description:
			"Система постановки и распределения задач между командами и трайбами",
	},
	{
		title: "ARTFEED",
		description:
			"Маркетплейс для художников в Великобритании: разработка продукта и дальнейшая поддержка",
	},
];

export const HOME_MADE_BY_ME = [
	{
		title: "Voxmeter",
		description:
			"Интерактивный инструмент для презентаций и взаимодействия с аудиторией",
		image: "/made-by-me/voxmeter.svg",
		link: "/showcases/voxmeter",
	},
	{
		title: "Spotify Clone",
		description: "Демо-приложение с ключевыми функциями Spotify",
		image: "/made-by-me/spotify.webp",
		link: "/showcases/spotify",
	},
	{
		title: "HR App",
		description:
			"Self-Hosted внутренний сервис опросов и обратной связи сотрудников",
		image: "/made-by-me/hr.png",
		link: "/showcases/hr-app",
	},
	{
		title: "Yandex Disk Gallery",
		description: "Удобный просмотр и навигация по файлам в Яндекс.Диске",
		image: "/made-by-me/ya-disk.png",
		link: "/showcases/yandex-disk-gallery",
	},
];

export const HOME_SOCIAL_LINKS = [
	{
		Icon: GithubLogoIcon,
		link: "https://github.com/pyromatic-x",
	},
	{
		Icon: TelegramLogoIcon,
		link: "https://t.me/pyromaticx",
	},
	{
		Icon: EnvelopeSimpleIcon,
		link: "mailto:hvdraxx@gmail.com",
	},
];

export const HOME_TECH_STACK: { data: Array<Word>; colors: Array<string> } = {
	data: [
		{ text: "TypeScript", value: 2500 },
		{ text: "React", value: 2500 },
		{ text: "Next.js", value: 1200 },
		{ text: "Vue", value: 200 },
		{ text: "Nuxt", value: 200 },

		{ text: "Redux", value: 100 },
		{ text: "Effector", value: 200 },
		{ text: "MobX", value: 150 },
		{ text: "Zustand", value: 400 },
		{ text: "TanStack Query", value: 350 },
		{ text: "TanStack Router", value: 300 },

		{ text: "Tailwind", value: 250 },
		{ text: "SCSS", value: 200 },
		{ text: "styled components", value: 200 },
		{ text: "Material UI", value: 200 },
		{ text: "Bootstrap", value: 50 },
		{ text: "shadcn", value: 250 },

		{ text: "Zod", value: 40, rotate: 90 },
		{ text: "ESLint", value: 40, rotate: 90 },
		{ text: "biomejs", value: 40, rotate: 90 },
		{ text: "Jest", value: 40, rotate: 90 },
		{ text: "playwright", value: 30, rotate: 90 },
		{ text: "Webpack", value: 30, rotate: 90 },
		{ text: "Vite", value: 40, rotate: 90 },

		{ text: "NestJS", value: 700, rotate: 270 },
		{ text: "MongoDB", value: 600, rotate: 270 },
		{ text: "Express", value: 100, rotate: 270 },
		{ text: "mongoose", value: 100, rotate: 270 },
		{ text: "MySQL", value: 100, rotate: 270 },
		{ text: "Prisma", value: 100, rotate: 270 },
		{ text: "Docker", value: 100, rotate: 270 },
		{ text: "Websockets", value: 80, rotate: 270 },
	],
	colors: [
		"#c02729",
		"#ae2e31",
		"#943638",
		"#b02a2cd1",
		"#b02a2cb0",
		"#b02a2c8f",
	],
};
