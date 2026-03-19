import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ux/tooltip";
import Link from "next/link";

const buttonVariants = cva(
	"inline-flex relative items-center justify-center whitespace-nowrap rounded-md border border-transparent font-semibold outline-none select-none shrink-0 transition-all cursor-pointer group/button [&_svg]:pointer-events-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px]",
	{
		variants: {
			variant: {
				outlined: "",
				default:
					"bg-background border-px hover:bg-background/0 hover:ring-1 hover:scale-[1.01]",
				ghost: "bg-transparent",
			},
			size: {
				default: "h-9 px-4 gap-2",
				icon: "size-9 [&_svg]:transition-transform hover:[&_svg]:scale-110",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type BaseProps = VariantProps<typeof buttonVariants> & {
	asChild?: boolean;
	tooltip?: React.ReactNode;
	tooltipSide?: React.ComponentProps<typeof TooltipContent>["side"];
	subscriptionBadge?: boolean;
};

type ButtonAsLink = BaseProps &
	Omit<React.ComponentProps<typeof Link>, "className"> & {
		asLink: true;
		disabled?: boolean;
		className?: string;
	};

type ButtonAsButton = BaseProps &
	React.ComponentProps<"button"> & {
		asLink?: false;
	};

type Props = ButtonAsLink | ButtonAsButton;

function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}: Props) {
	const asLink = "asLink" in props && props.asLink;
	const disabled = props.disabled;

	const classes = cn(
		buttonVariants({ variant, size, className }),
		disabled && asLink && "pointer-events-none opacity-50",
	);

	if (asLink) {
		const {
			asLink: _,
			tooltip,
			tooltipSide,
			disabled: __,
			subscriptionBadge,
			...linkProps
		} = props as ButtonAsLink;
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Link
						data-variant={variant}
						data-size={size}
						className={classes}
						aria-disabled={disabled || undefined}
						tabIndex={disabled ? -1 : undefined}
						{...linkProps}
					>
						{props.children}
					</Link>
				</TooltipTrigger>
				{tooltip && (
					<TooltipContent side={tooltipSide}>{tooltip}</TooltipContent>
				)}
			</Tooltip>
		);
	}

	const {
		asLink: _,
		tooltip,
		tooltipSide,
		subscriptionBadge,
		...buttonProps
	} = props as ButtonAsButton;
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					data-variant={variant}
					data-size={size}
					className={classes}
					{...buttonProps}
				>
					{props.children}
				</button>
			</TooltipTrigger>
			{tooltip && <TooltipContent side={tooltipSide}>{tooltip}</TooltipContent>}
		</Tooltip>
	);
}

export { Button, buttonVariants };
