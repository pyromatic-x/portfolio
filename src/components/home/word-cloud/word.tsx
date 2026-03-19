import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { animated, useSpring, easings } from "@react-spring/web";

// Since the words in the word cloud fit tightly in a way that their bounding boxes could be overlapping
// (even thought the text is not)
// the mask is a bit smaller than the bounding box of the text (which also includes font line height).
const MASK_HEIGHT_SCALE = 0.55;
const MASK_WIDTH_SCALE = 1.05;

interface WordProps {
	text: string;
	fontSize: number;
	color: string;
	x: number;
	y: number;
	/** Угол поворота в градусах. Опционально, по умолчанию 0. */
	rotate?: number;
	isMasked: boolean;
	disableAnimations: boolean;
	onRemove: undefined | (() => void);
}

export const Word = ({
	fontSize,
	color,
	x,
	y,
	rotate = 0,
	isMasked,
	disableAnimations,
	onRemove,
	text,
	...rest
}: WordProps) => {
	const textRef = useRef<SVGTextElement>(null);
	const [textWidth, setTextWidth] = useState<number | undefined>(undefined);
	const [textHeight, setTextHeight] = useState<number | undefined>(undefined);
	const [isHovered, setIsHovered] = useState(false);

	const transform =
		rotate !== 0
			? `translate(${x}, ${y}) rotate(${rotate})`
			: `translate(${x}, ${y})`;

	const styles = useSpring({
		fontSize,
		fill: color,
		transform,
		config: {
			easing: easings.easeInOutCubic,
		},
		immediate: disableAnimations,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: skip
	useLayoutEffect(() => {
		const bbox = textRef.current?.getBBox();
		if (bbox) {
			// The width should be twice the x value but it's not the case for emojis, then we fallback to the x value
			const widthTooBig = bbox.width > Math.abs(bbox.x * 2);
			setTextWidth(widthTooBig ? Math.abs(bbox.x) : bbox.width);
			setTextHeight(Math.abs(bbox.y));
		}
	}, [text, fontSize]);

	const shouldDisplayText =
		!isMasked || textWidth === undefined || textHeight === undefined;

	const stylesWithRemovingOnHover: CSSProperties = {
		textDecoration: "line-through",
		cursor: "pointer",
		opacity: shouldDisplayText ? 0.3 : 1,
	};

	const { textOpacity, rectOpacity } = useSpring({
		from: {
			textOpacity: 0,
			rectOpacity: 0,
		},
		to: {
			textOpacity: shouldDisplayText ? 1 : 0,
			rectOpacity: isMasked ? 0.7 : 0,
		},
		immediate: disableAnimations,
	});

	return (
		<>
			{textWidth && textHeight && (
				<animated.rect
					rx={textHeight * 0.3}
					x={-(textWidth * MASK_WIDTH_SCALE) / 2}
					y={-textHeight * MASK_HEIGHT_SCALE}
					width={textWidth * MASK_WIDTH_SCALE}
					height={textHeight * MASK_HEIGHT_SCALE}
					fill={color}
					transform={styles.transform}
					style={{
						opacity: rectOpacity,
						willChange: "opacity, transform",
					}}
				/>
			)}
			<animated.text
				ref={textRef}
				transform={styles.transform}
				style={{
					textAnchor: "middle",
					willChange: "opacity, transform",
					textDecoration: "none",
					cursor: "default",
					opacity: textOpacity,
					fontSize: styles.fontSize,
					fill: styles.fill,
					...(isHovered && onRemove ? stylesWithRemovingOnHover : {}),
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={onRemove}
				{...rest}
			>
				{text}
			</animated.text>
		</>
	);
};
