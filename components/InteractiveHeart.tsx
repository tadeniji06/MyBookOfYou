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
		<div className='flex flex-col items-center justify-center gap-4 py-10'>
			<motion.div
				animate={controls}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={handleTap}
				className='cursor-pointer relative z-10'
			>
				<div className='relative'>
					<Heart
						size={80}
						className='text-brand-red fill-brand-red drop-shadow-[0_0_15px_rgba(255,0,51,0.5)]'
						strokeWidth={1}
					/>
					{/* Beat effect ring */}
					<motion.div
						initial={{ opacity: 0, scale: 1 }}
						animate={{
							opacity: [0, 0.5, 0],
							scale: [1, 2],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeOut",
						}}
						className='absolute inset-0 rounded-full border-2 border-brand-red'
						style={{ borderRadius: "50%" }}
					/>
				</div>
			</motion.div>

			<motion.p
				key={count}
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className='text-brand-red font-bold text-xl tracking-widest'
			>
				{count > 0 ? `${count} LOVE TAPS` : "TAP MY HEART"}
			</motion.p>
		</div>
	);
}
