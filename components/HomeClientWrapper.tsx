"use client";

import IntroductionSequence from "@/components/IntroductionSequence";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

export default function HomeClientWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [accessGranted, setAccessGranted] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const access = Cookies.get("access-granted");
		if (access) {
			setAccessGranted(true);
		}
		setLoading(false);
	}, []);

	const handleComplete = () => {
		Cookies.set("access-granted", "true", { expires: 1 }); // Expires in 1 day
		setAccessGranted(true);
	};

	if (loading) return null; // Or a loading spinner

	return (
		<div className='flex flex-col items-center min-h-screen bg-black text-white relative overflow-hidden'>
			<AnimatePresence mode='wait'>
				{!accessGranted && (
					<IntroductionSequence onComplete={handleComplete} />
				)}
			</AnimatePresence>

			{/* Background Ambience*/}
			{accessGranted && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
					transition={{ duration: 2 }}
					className='absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black pointer-events-none'
				/>
			)}

			{accessGranted && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.2 }}
					className='z-10 w-full flex flex-col items-center px-4 pt-20 pb-10 gap-16'
				>
					{children}
				</motion.div>
			)}
		</div>
	);
}
