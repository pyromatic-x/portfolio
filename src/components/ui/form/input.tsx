import { forwardRef, useState, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
	"w-full rounded-md py-2 px-3 transition-all disabled:pointer-events-none disabled:opacity-50 placeholder:text-white/70",
	{
		variants: {
			variant: {
				filled:
					"bg-text/50 text-white border-2 outline-transparent outline-offset-0 border-transparent hover:border-text hover:bg-text/70 focus:bg-text focus:outline-offset-2 outline-2 focus:outline-solid focus:outline-text",
			},
		},
		defaultVariants: {
			variant: "filled",
		},
	},
);

type FieldProps = Omit<
	ComponentProps<"input"> & ComponentProps<"textarea">,
	"size"
> &
	VariantProps<typeof inputVariants> & {
		charsLimit?: number;
		label?: string;
		component?: "input" | "textarea";
	};

export const Input = (props: Omit<FieldProps, "component">) => (
	<Field {...props} component="input" />
);
export const Textarea = (props: Omit<FieldProps, "component">) => (
	<Field {...props} component="textarea" />
);

const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
	(
		{
			className,
			variant = "filled",
			label,
			charsLimit,
			onChange,
			component: Component = "input",
			...props
		},
		ref,
	) => {
		const [length, setLength] = useState(0);
		const remaining = charsLimit != null ? charsLimit - length : undefined;

		const handleChange = (
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		) => {
			setLength(e.target.value.length);
			(
				onChange as React.ChangeEventHandler<
					HTMLInputElement | HTMLTextAreaElement
				>
			)?.(e);
		};

		return (
			<div className="relative w-full">
				{label && <Label title={label} htmlFor={props.id} />}
				<Component
					{...props}
					ref={
						ref as React.Ref<HTMLInputElement> & React.Ref<HTMLTextAreaElement>
					}
					onChange={handleChange}
					data-variant={variant}
					className={cn(
						"peer",
						inputVariants({
							variant,
							className: cn(charsLimit && "pr-5", className),
						}),
					)}
					maxLength={charsLimit ?? props.maxLength}
				/>
				<span
					className={cn(
						"absolute right-2 bottom-2.5 pointer-events-none tabular-nums text-[10px] font-medium text-white opacity-0 transition-opacity peer-focus:opacity-100",
					)}
				>
					{remaining}
				</span>
			</div>
		);
	},
);

const Label = (props: ComponentProps<"label">) => (
	<label
		{...props}
		htmlFor={props.htmlFor}
		className={cn(["font-medium block mb-1", props.className])}
	>
		{props.title}
	</label>
);
