"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

// Simple custom confetti using Framer Motion
const Confetti = () => {
	const [pieces, setPieces] = useState<any[]>([]);

	useEffect(() => {
		const newPieces = Array.from({ length: 60 }).map((_, i) => ({
			id: i,
			x: Math.random() * 200 - 100 + "vw",
			y: -(Math.random() * 50 + 10) + "vh",
			rotation: Math.random() * 360,
			scale: Math.random() * 0.5 + 0.5,
			color: ["#ff4d85", "#ff8fb3", "#ffffff", "#ffd700", "#ff69b4"][Math.floor(Math.random() * 5)],
			delay: Math.random() * 0.5,
		}));
		setPieces(newPieces);
	}, []);

	return (
		<div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden flex items-center justify-center">
			{pieces.map((piece) => (
				<motion.div
					key={piece.id}
					initial={{ opacity: 1, x: 0, y: "-20vh", rotate: 0, scale: piece.scale }}
					animate={{
						y: "120vh",
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

export default function AppreciationCTA() {
	const [isOpen, setIsOpen] = useState(false);

	// Prevent scrolling when popup is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	return (
		<div className="my-16 flex flex-col items-center justify-center w-full relative">
			{/* Animated pointing hand */}
			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
				className="text-4xl mb-4 text-brand-red drop-shadow-md"
			>
				👇
			</motion.div>

			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => setIsOpen(true)}
				className="bg-gradient-to-r from-brand-red to-[#ff1493] text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_10px_30px_rgba(255,77,133,0.3)] hover:shadow-[0_15px_40px_rgba(255,77,133,0.5)] transition-all flex items-center gap-3 group"
			>
				<Heart className="group-hover:animate-ping absolute opacity-50" />
				<Heart className="relative z-10" />
				<span className="relative z-10 tracking-wider">A Special Appreciation</span>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[150] flex items-center justify-center bg-white/80 backdrop-blur-md p-4"
						onClick={() => setIsOpen(false)}
					>
						<Confetti />
						
						<motion.div
							initial={{ scale: 0.8, y: 50, opacity: 0 }}
							animate={{ scale: 1, y: 0, opacity: 1 }}
							exit={{ scale: 0.8, y: 50, opacity: 0 }}
							transition={{ type: "spring", bounce: 0.4 }}
							onClick={(e) => e.stopPropagation()}
							className="relative w-full max-w-lg bg-white rounded-3xl p-10 md:p-14 text-center shadow-[0_20px_60px_rgba(255,77,133,0.2)] border-2 border-brand-red/10 z-[160]"
						>
							<motion.button
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								onClick={() => setIsOpen(false)}
								className='absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-900 shadow-sm'
							>
								<X size={20} />
							</motion.button>

							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.3, type: "spring" }}
								className="mx-auto w-24 h-24 bg-brand-red/10 rounded-full flex items-center justify-center mb-8 shadow-inner"
							>
								<Heart className="text-brand-red fill-brand-red animate-pulse" size={48} />
							</motion.div>

							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
								Words are barely enough to express my love...
							</h2>
							
							<p className="text-4xl md:text-5xl font-black text-gradient-red mt-8 tracking-tight drop-shadow-sm">
								I LOVE YOU!
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
