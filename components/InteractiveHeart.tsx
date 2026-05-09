"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function InteractiveHeart() {
	const [count, setCount] = useState(0);
	const controls = useAnimation();

	const handleTap = async () => {
		setCount((prev) => prev + 1);
		await controls.start({
			scale: [1, 1.5, 1],
			transition: { duration: 0.3 },
		});
	};

	return (
		<div className='flex flex-col items-center justify-center gap-6 py-16 relative'>
			{/* Decorative background glow behind the heart */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
			
			<motion.div
				animate={controls}
				whileHover={{ scale: 1.15 }}
				whileTap={{ scale: 0.85 }}
				onClick={handleTap}
				className='cursor-pointer relative z-10 p-6 glass-panel rounded-full hover:shadow-[0_0_50px_rgba(230,0,38,0.3)] transition-shadow duration-500'
			>
				<div className='relative flex items-center justify-center'>
					<Heart
						size={72}
						className='text-brand-red fill-brand-red drop-shadow-[0_0_20px_rgba(230,0,38,0.6)]'
						strokeWidth={1.5}
					/>
					{/* Beat effect ring */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{
							opacity: [0, 0.4, 0],
							scale: [1, 2.5],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeOut",
						}}
						className='absolute inset-0 rounded-full border-2 border-brand-red/50 pointer-events-none'
					/>
				</div>
			</motion.div>

			<motion.div
				key={count}
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className='text-center space-y-1'
			>
				<p className='text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase'>
					{count > 0 ? 'Beating for you' : 'Show some love'}
				</p>
				<p className='text-gradient-red font-bold text-2xl tracking-wider'>
					{count > 0 ? `${count} LOVE TAPS` : "TAP MY HEART"}
				</p>
			</motion.div>
		</div>
	);
}
