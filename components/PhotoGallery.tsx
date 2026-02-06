"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { r1, r2, r3 } from "@/assets";

export default function PhotoGallery() {
	const photos = [r1, r2, r3];

	return (
		<div className='relative h-64 md:h-96 w-full max-w-2xl mx-auto my-12 flex justify-center items-center perspective-1000'>
			{photos.map((photo, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, x: 0, rotate: 0, scale: 0.8 }}
					animate={{
						opacity: 1,
						x: (index - 1) * 40, // Offset them slightly horizontally
						rotate: (index - 1) * 6, // Rotate them like a fan
						scale: 1,
						y: Math.abs(index - 1) * -10, // Slight arc effect
					}}
					whileHover={{
						scale: 1.1,
						zIndex: 10,
						rotate: 0,
						transition: { duration: 0.3 },
					}}
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
	);
}
