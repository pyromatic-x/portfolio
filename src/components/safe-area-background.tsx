"use client";

import { useEffect } from "react";

export const SafeAreaBackground = ({ color }: { color: string }) => {
	useEffect(() => {
		const html = document.documentElement;
		const prev = html.style.background;
		html.style.background = color;

		return () => {
			html.style.background = prev;
		};
	}, [color]);

	return null;
};
