"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { r1, r2, r3 } from "@/assets";
import { useState } from "react";
import { X } from "lucide-react";

export default function PhotoGallery() {
	const photos = [r1, r2, r3];
	const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

	return (
		<>
			<div className='relative h-64 md:h-96 w-full max-w-2xl mx-auto my-12 flex justify-center items-center perspective-1000'>
				{photos.map((photo, index) => (
					<motion.div
						layoutId={`photo-${index}`}
						key={index}
						initial={{ opacity: 0, x: 0, rotate: 0, scale: 0.8 }}
						animate={{
							opacity: 1,
							x: (index - 1) * 40,
							rotate: (index - 1) * 6,
							scale: 1,
							y: Math.abs(index - 1) * -10,
						}}
						whileHover={{
							scale: 1.1,
							zIndex: 10,
							rotate: 0,
							transition: { duration: 0.3 },
						}}
						onClick={() => setSelectedPhoto({ photo, index })}
						transition={{
							delay: 0.5 + index * 0.2,
							duration: 0.8,
							type: "spring",
							stiffness: 100,
						}}
						className='absolute h-56 w-40 md:h-80 md:w-60 border-4 border-white shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden rounded-xl cursor-pointer'
						style={{ zIndex: index }}
					>
						<div className='relative w-full h-full bg-zinc-900'>
							<Image
								src={photo}
								alt={`Us ${index + 1}`}
								fill
								className='object-cover'
								placeholder='blur'
							/>
						</div>
					</motion.div>
				))}
			</div>

			{/* Lightbox */}
			<AnimatePresence>
				{selectedPhoto && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelectedPhoto(null)}
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4'
					>
						<motion.button
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							className='absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white'
						>
							<X size={24} />
						</motion.button>

						<motion.div
							layoutId={`photo-${selectedPhoto.index}`}
							className='relative w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800'
							onClick={(e) => e.stopPropagation()}
						>
							<Image
								src={selectedPhoto.photo}
								alt='Us Fullscreen'
								fill
								className='object-contain'
								placeholder='blur'
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
