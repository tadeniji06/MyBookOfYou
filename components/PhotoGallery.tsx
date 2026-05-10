"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { r1, r2, r3 } from "@/assets";
import { useState, useRef, useEffect } from "react";
import { Play, ChevronRight, X } from "lucide-react";

export default function PhotoGallery() {
	const photos = [r1, r2, r3];
	const vidSrc = "/2nVid.mp4";
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isOnboarding, setIsOnboarding] = useState(true);
	const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

	const handleNext = () => {
		if (currentIndex < photos.length) {
			setCurrentIndex(currentIndex + 1);
		} else {
			setIsOnboarding(false);
		}
	};

	// Prevent scrolling while onboarding is active
	useEffect(() => {
		if (isOnboarding) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOnboarding]);

	if (isOnboarding) {
		const isVideo = currentIndex === photos.length;
		return (
			<div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
				<AnimatePresence mode="wait">
					{!isVideo ? (
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, scale: 0.9, x: 50 }}
							animate={{ opacity: 1, scale: 1, x: 0 }}
							exit={{ opacity: 0, scale: 1.1, x: -50 }}
							transition={{ duration: 0.5 }}
							className="relative w-full max-w-md md:max-w-xl h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(255,77,133,0.2)] border-[8px] border-white"
						>
							<Image
								src={photos[currentIndex]}
								alt={`Memory ${currentIndex + 1}`}
								fill
								className="object-cover"
								placeholder="blur"
							/>
						</motion.div>
					) : (
						<motion.div
							key="video"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
							className="relative w-full max-w-md md:max-w-xl h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(255,77,133,0.2)] border-[8px] border-white bg-black flex items-center justify-center"
						>
							<video 
								src={vidSrc} 
								className="w-full h-full object-cover" 
								autoPlay 
								playsInline 
								onEnded={handleNext}
								controls
							/>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="absolute bottom-10 flex flex-col items-center gap-5 w-full px-6">
					<p className="text-brand-red font-bold tracking-widest text-xs md:text-sm uppercase bg-white px-4 py-1.5 rounded-full shadow-sm">
						{isVideo ? "A special message..." : `Memory ${currentIndex + 1} of ${photos.length}`}
					</p>
					
					{!isVideo && (
						<button 
							onClick={handleNext}
							className="bg-brand-red text-white px-8 py-3.5 rounded-full font-bold shadow-[0_0_20px_rgba(255,77,133,0.4)] flex items-center gap-2 hover:bg-brand-red-dim hover:scale-105 transition-all duration-300 w-full max-w-xs justify-center"
						>
							Next Memory <ChevronRight size={20} />
						</button>
					)}
					{isVideo && (
						<button 
							onClick={handleNext}
							className="bg-gray-900 text-white px-8 py-3.5 rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-black hover:scale-105 transition-all duration-300 w-full max-w-xs justify-center mt-2"
						>
							Enter Journal
						</button>
					)}
				</div>
			</div>
		);
	}

	// After onboarding, show them as a nice grid
	return (
		<>
			<div className="w-full max-w-4xl mx-auto my-16 px-4">
				{/* <h2 className="text-4xl md:text-5xl font-bold text-center text-gradient-red mb-12 drop-shadow-sm">Our Memories</h2> */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
					{photos.map((photo, index) => (
						<motion.div
							layoutId={`photo-${index}`}
							key={index}
							whileHover={{ scale: 1.03, zIndex: 10 }}
							onClick={() => setSelectedPhoto({ type: 'image', src: photo, index })}
							className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(255,77,133,0.15)] border-4 md:border-8 border-white bg-white aspect-square ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
						>
							<Image
								src={photo}
								alt={`Us ${index + 1}`}
								fill
								className='object-cover hover:scale-110 transition-transform duration-700'
								placeholder='blur'
							/>
						</motion.div>
					))}
					<motion.div
						whileHover={{ scale: 1.03, zIndex: 10 }}
						onClick={() => setSelectedPhoto({ type: 'video', src: vidSrc, index: 99 })}
						className='relative cursor-pointer rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(255,77,133,0.15)] border-4 md:border-8 border-white bg-black aspect-square flex items-center justify-center group'
					>
						<video src={vidSrc} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
						<div className="z-10 bg-white/20 p-4 rounded-full backdrop-blur-md group-hover:scale-110 group-hover:bg-brand-red transition-all duration-300 shadow-lg">
							<Play className="text-white fill-white" size={32} />
						</div>
					</motion.div>
				</div>
			</div>

			{/* Lightbox */}
			<AnimatePresence>
				{selectedPhoto && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelectedPhoto(null)}
						className='fixed inset-0 z-[120] flex items-center justify-center bg-white/95 backdrop-blur-xl p-4 md:p-10'
					>
						<motion.button
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							className='absolute top-6 right-6 p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-900 shadow-md z-[130]'
						>
							<X size={24} />
						</motion.button>

						<motion.div
							layoutId={selectedPhoto.type === 'image' ? `photo-${selectedPhoto.index}` : undefined}
							className='relative w-full max-w-5xl h-full max-h-[85vh] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-[8px] border-white bg-gray-50 flex items-center justify-center'
							onClick={(e) => e.stopPropagation()}
						>
							{selectedPhoto.type === 'image' ? (
								<Image
									src={selectedPhoto.src}
									alt='Fullscreen Memory'
									fill
									className='object-contain'
									placeholder='blur'
								/>
							) : (
								<video 
									src={selectedPhoto.src} 
									className="w-full h-full object-contain bg-black" 
									controls 
									autoPlay 
								/>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
