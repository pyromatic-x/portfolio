"use client";

import d3Cloud from "d3-cloud";
import { scaleOrdinal, scaleLog } from "d3-scale";
import { useEffect, useState } from "react";
import { Word as WordViz } from "./word";
import { WordCloudResizer } from "./word-cloud-resizer";
import { SvgWithFont } from "./svg-with-font";

export interface Word extends d3Cloud.Word {
	text: string;
	value: number;
	rotate?: number;
}

interface Visualization<TKey, TLabel> {
	data: TKey[];
	width: number;
	height: number;
	colors: string[];
	fontFamily: string;
	fontWeight?: string | number;
	keyAccessor?: (d: TKey) => string;
	labelAccessor?: (d: TLabel) => string;
	valueAccessor?: (d: TKey) => number;
	disableAnimations?: boolean;
}

const SCALING_FACTOR = 0.8;
const MINIMUM_DOMAIN_SPAN = 5;

export const WordCloud = ({
	data,
	width,
	height,
	colors,
	fontFamily,
	fontWeight = 500,
	keyAccessor = (d: Word) => d.text,
	labelAccessor = (d: Word) => d.text,
	valueAccessor = (d: Word) => d.value,
	disableAnimations = false,
	shouldMaskWords = false,
	onRemoveWord,
}: Visualization<Word, Word> & {
	shouldMaskWords?: boolean;
	onRemoveWord?: (key: string) => void;
}) => {
	const [wordsPosition, setWordsPosition] = useState<Word[]>([]);

	const maxValue = Math.max(...data.map(valueAccessor), MINIMUM_DOMAIN_SPAN);
	const fontSizeScale = scaleLog().domain([1, maxValue]).range([10, 50]);

	const sortedData = JSON.parse(JSON.stringify(data)).sort(
		(a: Word, b: Word) => valueAccessor(a) - valueAccessor(b),
	);

	const discreteValues = data.map(keyAccessor);

	const fillColors = scaleOrdinal(colors).domain(discreteValues);

	const innerHeight = height * SCALING_FACTOR;
	const innerWidth = width * SCALING_FACTOR;

	const layout = d3Cloud<Word>()
		.size([innerWidth, innerHeight])
		.words(sortedData)
		.text(labelAccessor)
		.timeInterval(100)
		.fontSize((d) => fontSizeScale(d.value))
		.padding(3)
		.font(fontFamily)
		.rotate((d) => (d as Word).rotate ?? 0)
		.random(() => 0.5) // makes it centered??
		.on("end", (words) => {
			setWordsPosition(words);
		});

	// biome-ignore lint/correctness/useExhaustiveDependencies: skip
	useEffect(() => {
		if (width <= 0 || height <= 0) {
			return;
		}
		layout.start();
	}, [data, width, height]);

	const paddingLeft = width / 2 - innerWidth / 2;
	const paddingTop = height / 2 - innerHeight / 2;

	if (width <= 0 || height <= 0 || !wordsPosition.length) {
		return null;
	}

	return (
		<SvgWithFont
			width={width}
			height={height}
			fontFamily={fontFamily}
			fontWeight={fontWeight}
			style={{ overflow: "visible" }}
		>
			<g transform={`translate(${paddingLeft},${paddingTop})`}>
				<WordCloudResizer
					height={innerHeight}
					width={innerWidth}
					words={wordsPosition}
					disableAnimations={disableAnimations ?? false}
				>
					{wordsPosition.map((word) => (
						<WordViz
							key={keyAccessor(word)}
							text={word.text}
							fontSize={word.size ?? 10}
							x={word.x ?? 0}
							y={word.y ?? 0}
							rotate={word.rotate ?? 0}
							color={fillColors(keyAccessor(word))}
							isMasked={shouldMaskWords ?? false}
							disableAnimations={disableAnimations ?? false}
							onRemove={
								!shouldMaskWords && onRemoveWord
									? () => onRemoveWord(keyAccessor(word))
									: undefined
							}
						/>
					))}
				</WordCloudResizer>
			</g>
		</SvgWithFont>
	);
};
