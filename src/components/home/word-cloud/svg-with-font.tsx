import type { PropsWithChildren, SVGProps } from "react";

interface SvgWithFontProps extends SVGProps<SVGSVGElement> {
	fontFamily: string;
}

export const SvgWithFont = ({
	children,
	fontFamily,
	...props
}: PropsWithChildren<SvgWithFontProps>) => {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: skip
		<svg {...props} fontFamily={fontFamily}>
			{children}
		</svg>
	);
};
