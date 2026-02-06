"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, XCircle, Play } from "lucide-react";

interface IntroductionSequenceProps {
	onComplete: () => void;
}

const QUESTIONS = [
	{
		id: 1,
		question:
			"What's one slang you know I say a lot and almost everyday?",
		answers: ["type shii"],
		placeholder: "Hint: 2 words...",
	},
	{
		id: 2,
		question: "What's my fav car brand?",
		answers: ["bmw"],
		placeholder: "Vroom vroom...",
	},
	{
		id: 3,
		question: "What's my team?",
		answers: ["man utd", "manchester united"],
		placeholder: "GGMU...",
	},
];

export default function IntroductionSequence({
	onComplete,
}: IntroductionSequenceProps) {
	// ... (state remains the same)
	const [step, setStep] = useState<"video" | "quiz" | "success">(
		"video",
	);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [showPlayButton, setShowPlayButton] = useState(false);

	// ... (video handlers remain same)
	// Handle Video End
	const handleVideoEnd = () => {
		setStep("quiz");
	};

	// Attempt Autoplay
	useEffect(() => {
		if (videoRef.current) {
			const playPromise = videoRef.current.play();
			if (playPromise !== undefined) {
				playPromise.catch(() => {
					// Auto-play was prevented
					setShowPlayButton(true);
				});
			}
		}
	}, []);

	const handleManualPlay = () => {
		if (videoRef.current) {
			videoRef.current.play();
			videoRef.current.muted = false; // Unmute if manually played
			setShowPlayButton(false);
		}
	};

	const handleAnswerSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const currentQ = QUESTIONS[currentQuestionIndex];

		// Normalize input: lowercase, trim extra spaces
		const normalizedInput = inputValue.toLowerCase().trim();
		// Check if input matches ANY of the valid answers
		const isCorrect = currentQ.answers.some(
			(ans) => ans.toLowerCase() === normalizedInput,
		);

		if (isCorrect) {
			setError(false);
			setInputValue("");

			if (currentQuestionIndex < QUESTIONS.length - 1) {
				setCurrentQuestionIndex((prev) => prev + 1);
			} else {
				setStep("success");
			}
		} else {
			setError(true);
		}
	};

	return (
		<motion.div
			className='fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden'
			initial={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 1 } }}
		>
			<AnimatePresence mode='wait'>
				{/* VIDEO STEP */}
				{step === "video" && (
					<motion.div
						key='video-step'
						className='w-full h-full relative'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<video
							ref={videoRef}
							src='/vid.mp4'
							className='w-full h-full object-cover'
							playsInline
							// muted // Start muted to allow autoplay, user can unmute or we provide button
							onEnded={handleVideoEnd}
						/>
						{/* Overlay gradient for better text visibility if needed */}
						<div className='absolute inset-0 bg-black/20' />

						{showPlayButton && (
							<div className='absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20'>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleManualPlay}
									className='bg-brand-red text-white p-6 rounded-full shadow-[0_0_50px_rgba(255,0,51,0.5)]'
								>
									<Play size={40} fill='currentColor' />
								</motion.button>
							</div>
						)}

						<div className='absolute bottom-10 right-10 text-white/50 text-xs'>
							<button
								onClick={handleVideoEnd}
								className='hover:text-white transition-colors'
							>
								Skip Intro
							</button>
						</div>
					</motion.div>
				)}

				{/* QUIZ STEP */}
				{step === "quiz" && (
					<motion.div
						key='quiz-step'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, y: -50 }}
						className='w-full max-w-md px-6'
					>
						<div className='text-center mb-8'>
							<motion.h2
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-red to-white mb-2'
							>
								Security Check
							</motion.h2>
							<p className='text-zinc-500 text-sm'>
								Prove you are the one ❤️
							</p>
						</div>

						<motion.div
							key={currentQuestionIndex}
							className='bg-zinc-900/80 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden'
							initial={{ x: 50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: -50, opacity: 0 }}
							transition={{ type: "spring", bounce: 0.3 }}
						>
							{/* Progress Bar */}
							<div
								className='absolute top-0 left-0 h-1 bg-brand-red transition-all duration-300'
								style={{
									width: `${(currentQuestionIndex / QUESTIONS.length) * 100}%`,
								}}
							/>

							<h3 className='text-xl text-white font-medium mb-6'>
								{QUESTIONS[currentQuestionIndex].question}
							</h3>

							<form
								onSubmit={handleAnswerSubmit}
								className='relative'
							>
								<input
									type='text'
									value={inputValue}
									onChange={(e) => {
										setInputValue(e.target.value);
										setError(false);
									}}
									placeholder={
										QUESTIONS[currentQuestionIndex].placeholder
									}
									className={`w-full bg-black/50 border-2 ${error ? "border-red-500 text-red-500" : "border-zinc-700 focus:border-brand-red text-white"} rounded-xl px-4 py-4 pr-12 outline-none transition-all placeholder:text-zinc-600`}
									autoFocus
								/>
								<button
									type='submit'
									disabled={!inputValue}
									className='absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-zinc-800 rounded-lg text-white hover:bg-brand-red hover:text-white disabled:opacity-50 disabled:hover:bg-zinc-800 transition-colors'
								>
									{error ? (
										<XCircle size={20} className='text-red-500' />
									) : (
										<Send size={20} />
									)}
								</button>

								{error && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className='text-red-500 text-xs mt-2 absolute -bottom-6 left-0'
									>
										Try again, my love!
									</motion.p>
								)}
							</form>
						</motion.div>
					</motion.div>
				)}

				{/* SUCCESS STEP */}
				{step === "success" && (
					<motion.div
						key='success-step'
						className='text-center px-6'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", delay: 0.2 }}
							className='w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]'
						>
							<CheckCircle2 size={40} className='text-white' />
						</motion.div>

						<h2 className='text-4xl font-bold text-white mb-4'>
							You passed!
						</h2>
						<p className='text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed'>
							Good job! Just so you know, the answers change every
							week regardless - so don&apos;t be too excited. 😉
						</p>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={onComplete}
							className='bg-brand-red text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(255,0,51,0.4)] hover:shadow-[0_0_40px_rgba(255,0,51,0.6)] transition-all'
						>
							Enter Journal
						</motion.button>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
