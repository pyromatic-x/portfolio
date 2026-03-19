import type { Metadata, Viewport } from "next";
import Providers from "./providers";
import "./globals.css";

import { Jost } from "next/font/google";

const jost = Jost({
	subsets: ["latin", "latin-ext", "cyrillic"],
	preload: true,
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
	viewportFit: "cover",
};

import { SEO } from "../constants/seo";
const ogImageUrl = `${new URL(SEO.url).origin}${SEO.image}`;

export const metadata: Metadata = {
	title: SEO.title,
	description: SEO.description,
	keywords: SEO.keywords,
	manifest: "/site.webmanifest",
	openGraph: {
		title: SEO.title,
		description: SEO.description,
		url: SEO.url,
		siteName: "Pyromatic",
		locale: "ru_RU",
		type: "website",
		images: [ogImageUrl],
	},
	twitter: {
		card: "summary_large_image",
		title: SEO.title,
		description: SEO.description,
		images: [ogImageUrl],
	},
	robots: {
		index: true,
		follow: true,
	},
	alternates: { canonical: SEO.url },
	icons: {
		icon: "/icon.svg",
	},
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="ru" className={jost.className}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
