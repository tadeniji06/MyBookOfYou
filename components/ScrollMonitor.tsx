"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Heart } from "lucide-react";

export default function ScrollMonitor() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<div className='fixed top-0 left-0 right-0 h-2 bg-brand-gray z-50'>
			<motion.div
				className='h-full bg-brand-red origin-left relative'
				style={{ scaleX }}
			>
				<motion.div
					className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2'
					style={{ x: 0 }} // Ensures it stays attached to the end of the bar
				>
					<Heart
						size={20}
						className='fill-brand-red text-brand-red drop-shadow-[0_0_5px_rgba(255,0,51,0.8)]'
					/>
				</motion.div>
			</motion.div>
		</div>
	);
}
