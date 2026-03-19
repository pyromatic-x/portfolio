"use client";

import { useState, type RefObject, useEffect, useCallback } from "react";

const useResizeObserver = (
	ref: React.RefObject<HTMLElement | null>,
	callback: ResizeObserverCallback,
) => {
	useEffect(() => {
		const observeTarget = ref.current;

		if (!observeTarget || !window.ResizeObserver) {
			return;
		}

		const resizeObserver = new ResizeObserver(callback);
		resizeObserver.observe(observeTarget);
		return () => {
			resizeObserver.unobserve(observeTarget);
		};
	}, [ref, callback]);
};

/**
 * Provides information about the size of an element
 * and its position relative to the viewport.
 */
export function useDimensions(
	target: RefObject<HTMLElement | null>,
): [number, number] {
	const [width, setWidth] = useState<number>(0);
	const [height, setHeight] = useState<number>(0);

	const onDimensionsChange = useCallback((entries: ResizeObserverEntry[]) => {
		if (entries[0]) {
			setWidth(entries[0].contentRect.width);
			setHeight(entries[0].contentRect.height);
		}
	}, []);

	useResizeObserver(target, onDimensionsChange);

	return [width, height];
}
