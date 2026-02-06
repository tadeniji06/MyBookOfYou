"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function LoveConclusion() {
	const [ref, inView] = useInView({
		threshold: 0.5,
		triggerOnce: true,
	});

	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		if (inView) {
			setShowPopup(true);
			// Auto hide after some time or keep it? User said "animated in and out".
			// Let's hide it after 4 seconds to be "in and out".
			const timer = setTimeout(() => setShowPopup(false), 4000);
			return () => clearTimeout(timer);
		}
	}, [inView]);

	return (
		<>
			<div
				ref={ref}
				className='h-20 w-full flex items-center justify-center py-20'
			>
				<p className='text-zinc-600 text-sm'>Fin.</p>
			</div>

			<AnimatePresence>
				{showPopup && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
						transition={{ duration: 0.8, ease: "backOut" }}
						className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm'
					>
						<motion.h1
							animate={{
								scale: [1, 1.2, 1],
								color: ["#ff0033", "#ffffff", "#ff0033"],
							}}
							transition={{ repeat: Infinity, duration: 1.5 }}
							className='text-6xl md:text-9xl font-black text-center text-brand-red tracking-tighter drop-shadow-[0_0_25px_rgba(255,0,51,0.8)]'
						>
							I LOVE YOU
						</motion.h1>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
