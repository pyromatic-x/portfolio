"use client";

import {
	type PropsWithChildren,
	useCallback,
	useRef,
	useState,
	useLayoutEffect,
} from "react";
import { easings, animated, useSpring } from "@react-spring/web";
import type { Word } from "./word-cloud";

export const WordCloudResizer = ({
	children,
	height,
	width,
	words,
	disableAnimations,
}: PropsWithChildren<{
	height: number;
	width: number;
	words: Word[];
	disableAnimations: boolean;
}>) => {
	const wordCloudRef = useRef<SVGGElement>(null);
	const [scale, setScale] = useState<number>(0.1);
	const [bboxCenter, setBboxCenter] = useState({ x: 0, y: 0 });

	const calculateScale = useCallback(() => {
		if (wordCloudRef.current && width > 0 && height > 0) {
			const bbox = wordCloudRef.current.getBBox();
			if (bbox.width > 0 && bbox.height > 0) {
				const newScale = Math.min(height / bbox.height, width / bbox.width);
				const roundedScale = Math.floor(newScale * 10) / 10;
				setScale(roundedScale);
				setBboxCenter({
					x: bbox.x + bbox.width / 2,
					y: bbox.y + bbox.height / 2,
				});
			}
		}
	}, [height, width]);

	useLayoutEffect(() => {
		if (words.length > 0) {
			calculateScale();
		}
	}, [words, calculateScale]);

	const { animatedScale } = useSpring({
		from: { animatedScale: scale },
		to: { animatedScale: scale },
		config: {
			easing: easings.easeOutBounce,
		},
		immediate: disableAnimations,
	});

	return (
		bboxCenter && (
			<animated.g
				ref={wordCloudRef}
				transform={animatedScale.to(
					(s) =>
						`translate(${width / 2 - bboxCenter.x * s},${height / 2 - bboxCenter.y * s}) scale(${s})`,
				)}
			>
				{children}
			</animated.g>
		)
	);
};
