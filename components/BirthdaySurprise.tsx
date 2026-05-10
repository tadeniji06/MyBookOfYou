"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Gift, Heart } from "lucide-react";

// Simple custom confetti using Framer Motion
const Confetti = () => {
	const [pieces, setPieces] = useState<any[]>([]);

	useEffect(() => {
		const newPieces = Array.from({ length: 50 }).map((_, i) => ({
			id: i,
			x: Math.random() * 200 - 100 + "vw",
			y: -(Math.random() * 50 + 10) + "vh",
			rotation: Math.random() * 360,
			scale: Math.random() * 0.5 + 0.5,
			color: ["#ff4d85", "#ff8fb3", "#ffffff", "#ffd700"][Math.floor(Math.random() * 4)],
			delay: Math.random() * 0.5,
		}));
		setPieces(newPieces);
	}, []);

	return (
		<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
			{pieces.map((piece) => (
				<motion.div
					key={piece.id}
					initial={{ opacity: 1, x: 0, y: "100vh", rotate: 0, scale: piece.scale }}
					animate={{
						y: piece.y,
						x: piece.x,
						rotate: piece.rotation,
						opacity: [1, 1, 0],
					}}
					transition={{
						duration: 3 + Math.random() * 2,
						ease: "easeOut",
						delay: piece.delay,
					}}
					className="absolute w-3 h-6 rounded-full"
					style={{ backgroundColor: piece.color }}
				/>
			))}
		</div>
	);
};

export default function BirthdaySurprise() {
	const [opened, setOpened] = useState(false);

	return (
		<div className='flex flex-col items-center justify-center gap-6 py-16 relative w-full'>
			{/* Decorative background glow behind the gift */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
			
			<AnimatePresence mode="wait">
				{!opened ? (
					<motion.div
						key="gift"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0, rotate: 180 }}
						whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setOpened(true)}
						className='cursor-pointer relative z-10 p-8 glass-panel rounded-[2rem] hover:shadow-[0_0_50px_rgba(255,77,133,0.4)] transition-shadow duration-500 flex flex-col items-center gap-4'
					>
						<div className="relative">
							<Gift size={80} className="text-brand-red drop-shadow-xl" strokeWidth={1.5} />
							<motion.div
								animate={{ y: [0, -10, 0] }}
								transition={{ repeat: Infinity, duration: 2 }}
								className="absolute -top-4 -right-4 text-2xl"
							>
								✨
							</motion.div>
						</div>
						<p className="text-gradient-red font-bold text-xl tracking-wider text-center">
							TAP TO OPEN YOUR SURPRISE!
						</p>
					</motion.div>
				) : (
					<motion.div
						key="card"
						initial={{ scale: 0.5, opacity: 0, y: 50 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						transition={{ type: "spring", stiffness: 200, damping: 20 }}
						className='relative z-20 p-10 glass-panel rounded-3xl max-w-md w-full text-center shadow-[0_20px_50px_rgba(255,77,133,0.2)] border-2 border-brand-red/30 bg-white/90'
					>
						<Confetti />
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.3, type: "spring" }}
							className="mx-auto w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mb-6"
						>
							<Heart className="text-brand-red fill-brand-red" size={40} />
						</motion.div>
						<h2 className="text-4xl font-bold text-gradient-red mb-4">Happy Birthday!</h2>
						<p className="text-zinc-600 text-lg leading-relaxed mb-6 font-medium">
							To the most amazing person in the world. This is your special day, and I wanted to make this space as bright and beautiful as you are. 🌸
						</p>
						<p className="text-sm text-brand-red font-bold tracking-widest uppercase">
							Enjoy your special theme
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
