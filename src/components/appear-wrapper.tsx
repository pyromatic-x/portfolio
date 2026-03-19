"use client";

import { motion } from "framer-motion";
import type { ComponentProps, PropsWithChildren } from "react";

export const AppearWrapper = ({
	children,
	...props
}: PropsWithChildren & ComponentProps<typeof motion.div>) => {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			transition={{ duration: 1 }}
			variants={{
				visible: { opacity: 1, transform: "none" },
				hidden: { opacity: 0 },
			}}
			{...props}
		>
			{children}
		</motion.div>
	);
};
