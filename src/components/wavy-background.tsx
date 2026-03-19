"use client";

import { nanoid } from "nanoid";
import { type PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";

type Point = {
	x: number;
	y: number;
	dx: number;
	dy: number;
	vx: number;
	vy: number;
};

type MouseEffect =
	| { type: "smear"; radius?: number; force?: number }
	| { type: "black-hole"; radius?: number; gravity?: number }
	| { type: "white-hole"; radius?: number; force?: number }
	| {
			type: "ripple";
			speed?: number;
			maxRadius?: number;
			amplitude?: number;
	  };

interface WavyBackgroundProps {
	lineGap?: number;
	pointGap?: number;
	lineColor?: string;
	effect?: "none" | "wind" | "waves" | "orogeny";
	mouseInteraction?: MouseEffect;
}

interface Ripple {
	x: number;
	y: number;
	radius: number;
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function WavyBackground({
	children,
	lineGap = 20,
	pointGap = 10,
	lineColor = "#999",
	effect = "none",
	mouseInteraction = { type: "smear" },
}: PropsWithChildren<WavyBackgroundProps>) {
	const boxRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stateRef = useRef({
		pointMatrix: [] as Point[][],
		rippleMap: new Map<string, Ripple>(),
		noise: createNoise2D(),
		mouse: { x: 0, y: 0, px: 0, py: 0, inside: false },
	});

	const propsRef = useRef({
		lineGap,
		pointGap,
		lineColor,
		effect,
		mouseInteraction,
	});
	propsRef.current = { lineGap, pointGap, lineColor, effect, mouseInteraction };

	const initPointMatrix = useCallback(() => {
		const box = boxRef.current;
		if (!box) return;

		const { lineGap, pointGap } = propsRef.current;
		const width = box.clientWidth;
		const height = box.clientHeight;
		const offset = lineGap * 3;

		const lineCount = Math.ceil((width + offset * 2) / lineGap);
		const pointCount = Math.ceil((height + offset * 2) / pointGap);

		const matrix: Point[][] = [];
		for (let j = 0; j < pointCount; j++) {
			matrix[j] = [];
		}

		for (let i = 0; i < lineCount; i++) {
			const x = i * lineGap - offset;
			for (let j = 0; j < pointCount; j++) {
				const y = j * pointGap - offset;
				matrix[j].push({ x, y, dx: 0, dy: 0, vx: 0, vy: 0 });
			}
		}

		stateRef.current.pointMatrix = matrix;
	}, []);

	const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (propsRef.current.mouseInteraction.type !== "ripple") return;
		const box = boxRef.current;
		if (!box) return;

		const rect = box.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		stateRef.current.rippleMap.set(nanoid(), { x, y, radius: 0 });
	}, []);

	useEffect(() => {
		const box = boxRef.current;
		const canvas = canvasRef.current;
		if (!box || !canvas) return;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = box.getBoundingClientRect();
			const m = stateRef.current.mouse;
			m.px = m.x;
			m.py = m.y;
			m.x = e.clientX - rect.left;
			m.y = e.clientY - rect.top;
			m.inside = true;
		};

		const handleMouseLeave = () => {
			stateRef.current.mouse.inside = false;
		};

		box.addEventListener("mousemove", handleMouseMove);
		box.addEventListener("mouseleave", handleMouseLeave);

		const resizeCanvas = () => {
			const dpr = window.devicePixelRatio || 1;
			canvas.width = box.clientWidth * dpr;
			canvas.height = box.clientHeight * dpr;
			initPointMatrix();
		};

		const observer = new ResizeObserver(resizeCanvas);
		observer.observe(box);
		resizeCanvas();

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let rafId: number;

		const effectFns: Record<string, (point: Point) => void> = {
			none: () => {},
			wind: (point) => {
				const { noise } = stateRef.current;
				const now = performance.now() / 8000;
				const value = noise(point.x * 0.005 + now, point.y * 0.005 - now);
				point.vx = value * -3;
				point.vy = value * 3;
			},
			waves: (point) => {
				const { noise } = stateRef.current;
				const now = performance.now() / 4000;
				const value = noise(point.x * 0.01 + now, point.y * 0.00005 + now / 10);
				point.vx = value * 3;
				point.vy = value * 3;
			},
			orogeny: (point) => {
				const { noise } = stateRef.current;
				const timing = 10000;
				const now = Math.floor(performance.now() / timing) * timing;
				const amplitude = (performance.now() % timing) / timing;
				const value = noise(point.x * 0.008 + now, point.y * 0.008 + now);
				point.vx = value * -amplitude;
				point.vy = value * 5 * amplitude;
			},
		};

		const mouseFns: Record<string, (point: Point, opts: MouseEffect) => void> =
			{
				smear: (point, opts) => {
					if (opts.type !== "smear") return;
					const p = propsRef.current;
					const { radius = p.lineGap * 5, force = 20 } = opts;
					const m = stateRef.current.mouse;

					const dx = point.x - m.x;
					const dy = point.y - m.y;
					const distance = Math.sqrt(dx ** 2 + dy ** 2);
					if (distance > radius) return;

					const ratio = 1 - distance / radius;
					point.vx += clamp((m.x - m.px) * ratio, -force, force);
					point.vy += clamp((m.y - m.py) * ratio, -force, force);
				},
				"black-hole": (point, opts) => {
					if (opts.type !== "black-hole") return;
					const p = propsRef.current;
					const { radius = p.lineGap * 5, gravity = 0.3 } = opts;
					const m = stateRef.current.mouse;

					const dx = point.x - m.x;
					const dy = point.y - m.y;
					const distance = Math.sqrt(dx ** 2 + dy ** 2);
					if (distance > radius) return;

					const ratio = (1 - distance / radius) ** 2;
					point.vx += (m.x - point.x) * gravity * ratio;
					point.vy += (m.y - point.y) * gravity * ratio;
				},
				"white-hole": (point, opts) => {
					if (opts.type !== "white-hole") return;
					const p = propsRef.current;
					const { radius = p.lineGap * 5, force = 6 } = opts;
					const m = stateRef.current.mouse;

					const dx = point.x - m.x;
					const dy = point.y - m.y;
					const distance = Math.sqrt(dx ** 2 + dy ** 2);
					if (distance > radius) return;

					const ratio = (1 - distance / radius) ** 3;
					point.vx += Math.sign(point.x - m.x) * force * ratio * 0.1;
					point.vy += Math.sign(point.y - m.y) * force * ratio;
				},
				ripple: (point, opts) => {
					if (opts.type !== "ripple") return;
					const boxEl = boxRef.current;
					if (!boxEl) return;

					const {
						speed = 0.001,
						maxRadius = Math.max(boxEl.clientWidth, boxEl.clientHeight),
						amplitude = 6,
					} = opts;

					const { rippleMap } = stateRef.current;
					const keysToDelete: string[] = [];

					rippleMap.forEach((ripple, key) => {
						const currentRadius = ripple.radius;
						const rdx = point.x - ripple.x;
						const rdy = (point.y - ripple.y) * 1.5;
						const distance = Math.sqrt(rdx ** 2 + rdy ** 2);
						const range = propsRef.current.lineGap * 2;

						if (
							distance < currentRadius + range &&
							distance > currentRadius - range
						) {
							const damping = Math.abs(maxRadius - currentRadius) / maxRadius;
							const r = 1 - Math.abs(distance - currentRadius) / range;
							point.vy += -(amplitude * r * damping);
						}

						ripple.radius += speed;
						if (ripple.radius >= maxRadius) {
							keysToDelete.push(key);
						}
					});

					for (const key of keysToDelete) {
						rippleMap.delete(key);
					}
				},
			};

		const loop = () => {
			const dpr = window.devicePixelRatio || 1;
			const p = propsRef.current;
			const { pointMatrix, rippleMap, mouse: m } = stateRef.current;
			const w = box.clientWidth;
			const h = box.clientHeight;

			ctx.resetTransform();
			ctx.scale(dpr, dpr);
			ctx.clearRect(0, 0, w, h);
			ctx.strokeStyle = p.lineColor;
			ctx.lineWidth = 1;

			const canMouseUpdate = m.inside || rippleMap.size > 0;
			const effectFn = effectFns[p.effect] ?? effectFns.none;
			const mouseFn = mouseFns[p.mouseInteraction.type];

			for (const points of pointMatrix) {
				for (const point of points) {
					effectFn(point);

					if (canMouseUpdate && mouseFn) {
						mouseFn(point, p.mouseInteraction);
					}

					point.vx *= 0.7;
					point.vy *= 0.7;
					point.vx += point.dx * -0.1;
					point.vy += point.dy * -0.1;
					point.dx += point.vx;
					point.dy += point.vy;
				}

				for (let i = 0; i < points.length - 1; i++) {
					const p0 = points[i];
					const p1 = points[i + 1];

					const x0 = p0.x + p0.dx;
					const y0 = p0.y + p0.dy;
					const x1 = p1.x + p1.dx;
					const y1 = p1.y + p1.dy;
					const cx = (x0 + x1) / 2;
					const cy = (y0 + y1) / 2;

					if (i === 0) {
						ctx.beginPath();
						ctx.moveTo(x0, y0);
					}

					ctx.quadraticCurveTo(x0, y0, cx, cy);
				}

				ctx.stroke();
			}

			rafId = requestAnimationFrame(loop);
		};

		rafId = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(rafId);
			observer.disconnect();
			box.removeEventListener("mousemove", handleMouseMove);
			box.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [initPointMatrix]);

	return (
		<div
			ref={boxRef}
			className="fixed top-0 left-0 w-screen h-screen z-0"
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ")
					handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
			}}
		>
			<canvas ref={canvasRef} className="h-full w-full" />
			{children}
		</div>
	);
}
