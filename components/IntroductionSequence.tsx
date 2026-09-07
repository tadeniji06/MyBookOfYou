"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, XCircle, Play, Heart } from "lucide-react";

interface IntroductionSequenceProps {
	onComplete: () => void;
}

type QuestionType = "text" | "radio";

interface Question {
	id: number;
	question: string;
	type: QuestionType;
	answers: string[];
	options?: string[];
	placeholder?: string;
}

const QUESTIONS: Question[] = [
	{
		id: 1,
		question: "When is our anniversary?",
		type: "radio",
		options: [
			"14th February 2025",
			"26th January 2026",
			"24th April 2024",
			"1st January 2026",
		],
		answers: ["26th january 2026"],
	},
	{
		id: 2,
		question: "When is my birthday?",
		type: "radio",
		options: ["24th April", "26th January", "10th October", "12th May"],
		answers: ["24th april"],
	},
	{
		id: 3,
		question: "When is your birthday?",
		type: "radio",
		options: ["24th April", "26th January", "10th October", "11th May"],
		answers: ["11th may"],
	},
	{
		id: 4,
		question: "What's my ibibio name?",
		type: "text",
		answers: ["iyene obong", "iyeneobong", "inyene obong"],
		placeholder: "Hint: 2 words...",
	},
	{
		id: 5,
		question: "What's your oriki?",
		type: "text",
		answers: ["adunni"],
		placeholder: "Hint: Starts with A...",
	},
];

// Helper to generate random floating hearts
const FloatingHearts = () => {
	const hearts = Array.from({ length: 15 });
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
			{hearts.map((_, i) => {
				const left = Math.random() * 100;
				const animationDuration = 5 + Math.random() * 10;
				const delay = Math.random() * 5;
				const size = 10 + Math.random() * 20;

				return (
					<motion.div
						key={i}
						initial={{ y: "100vh", opacity: 0, x: `${left}vw` }}
						animate={{ 
							y: "-10vh", 
							opacity: [0, 0.6, 0],
							x: [`${left}vw`, `${left + (Math.random() * 10 - 5)}vw`] 
						}}
						transition={{
							duration: animationDuration,
							repeat: Infinity,
							delay: delay,
							ease: "linear"
						}}
						className="absolute bottom-0 text-brand-red/30"
					>
						<Heart size={size} fill="currentColor" />
					</motion.div>
				);
			})}
		</div>
	);
};

export default function IntroductionSequence({
	onComplete,
}: IntroductionSequenceProps) {
	const [step, setStep] = useState<"video" | "quiz" | "success">("video");
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [showPlayButton, setShowPlayButton] = useState(false);
	const [shake, setShake] = useState(false);

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

	const handleAnswerSubmit = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
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
			setShake(true);
			setTimeout(() => setShake(false), 500);
		}
	};

	const handleRadioSelect = (option: string) => {
		setInputValue(option);
		setError(false);
	};

	const cardVariants = {
		hidden: { x: 50, opacity: 0, scale: 0.95 },
		visible: {
			x: 0,
			opacity: 1,
			scale: 1,
			transition: { stiffness: 300, damping: 20 },
		},
		shake: {
			x: [0, -10, 10, -10, 10, 0],
			opacity: 1,
			scale: 1,
			transition: { duration: 0.4 },
		},
	};

	return (
		<motion.div
			className='fixed inset-0 z-50 bg-white/95 flex flex-col items-center justify-center overflow-hidden'
			initial={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 1 } }}
		>
			{step !== "video" && <FloatingHearts />}
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
							src='/nVid.mp4'
							className='w-full h-screen object-cover opacity-100'
							playsInline
							onEnded={handleVideoEnd}
						/>
						<div className='absolute inset-0' />

						{showPlayButton && (
							<div className='absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-md z-20'>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleManualPlay}
									className='bg-brand-red/90 text-white p-6 rounded-full shadow-[0_0_50px_rgba(255,0,51,0.5)] flex flex-col items-center gap-2 group border border-red-500/50'
								>
									<Play size={40} fill='currentColor' className='group-hover:scale-110 transition-transform' />
								</motion.button>
							</div>
						)}

						<div className='absolute bottom-12 right-12 z-30'>
							<button
								onClick={handleVideoEnd}
								className='text-zinc-600 hover:text-black transition-colors text-sm font-medium tracking-widest uppercase border border-zinc-300 hover:border-zinc-500 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm'
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
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, y: -50 }}
						className='w-full max-w-lg px-6 relative z-10'
					>
						<div className='text-center mb-10'>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", delay: 0.1 }}
								className="mx-auto w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mb-4 border border-brand-red/30 shadow-[0_0_30px_rgba(255,0,51,0.2)]"
							>
								<Heart className="text-brand-red" size={28} />
							</motion.div>
							<motion.h2
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								className='text-3xl font-bold text-gray-900 mb-2 tracking-tight'
							>
								Security Check
							</motion.h2>
							<motion.p 
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.1 }}
								className='text-zinc-600 text-sm'
							>
								Prove you are the one ❤️
							</motion.p>
						</div>

						<motion.div
							key={currentQuestionIndex}
							className='bg-white/80 border border-brand-red/20 p-8 rounded-[2rem] backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_50px_rgba(255,77,133,0.1)]'
							variants={cardVariants}
							initial='hidden'
							animate={shake ? "shake" : "visible"}
							exit={{ x: -50, opacity: 0 }}
						>
							{/* Progress Bar */}
							<div className='absolute top-0 left-0 w-full h-1.5 bg-brand-red/10'>
								<div
									className='h-full bg-gradient-to-r from-brand-red/50 to-brand-red transition-all duration-500 ease-out'
									style={{
										width: `${(currentQuestionIndex / QUESTIONS.length) * 100}%`,
									}}
								/>
							</div>

							<div className="mt-2 mb-8">
								<span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-2 block">Question 0{currentQuestionIndex + 1}</span>
								<h3 className='text-2xl text-gray-900 font-medium leading-tight'>
									{QUESTIONS[currentQuestionIndex].question}
								</h3>
							</div>

							<form
								onSubmit={handleAnswerSubmit}
								className='relative'
							>
								{QUESTIONS[currentQuestionIndex].type === "text" ? (
									<div className="relative">
										<input
											type='text'
											value={inputValue}
											onChange={(e) => {
												setInputValue(e.target.value);
												setError(false);
											}}
											placeholder={QUESTIONS[currentQuestionIndex].placeholder}
											className={`w-full bg-white/60 border-2 ${error ? "border-red-500/50 text-red-500 focus:border-red-500" : "border-brand-red/20 focus:border-brand-red/70 text-gray-900"} rounded-2xl px-5 py-4 pr-14 outline-none transition-all placeholder:text-zinc-400 font-medium shadow-sm`}
											autoFocus
										/>
										<button
											type='submit'
											disabled={!inputValue}
											className='absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-brand-red text-white rounded-xl hover:bg-brand-red-dim disabled:opacity-0 disabled:scale-75 transition-all duration-300'
										>
											<Send size={18} className={error ? "text-red-500" : ""} />
										</button>
									</div>
								) : (
									<div className="space-y-3">
										{QUESTIONS[currentQuestionIndex].options?.map((option) => (
											<button
												key={option}
												type="button"
												onClick={() => handleRadioSelect(option)}
												className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${
													inputValue === option
														? "border-brand-red bg-brand-red/10 text-brand-red"
														: "border-brand-red/10 bg-white/40 text-gray-600 hover:border-brand-red/30 hover:text-brand-red hover:bg-brand-red/5"
												}`}
											>
												<span className="font-medium">{option}</span>
												<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
													inputValue === option ? "border-brand-red" : "border-gray-300 group-hover:border-brand-red/50"
												}`}>
													{inputValue === option && <div className="w-2.5 h-2.5 bg-brand-red rounded-full" />}
												</div>
											</button>
										))}
										<motion.button
											type='button'
											onClick={() => handleAnswerSubmit()}
											disabled={!inputValue}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: inputValue ? 1 : 0, y: inputValue ? 0 : 10 }}
											className='w-full mt-6 bg-brand-red text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-red-dim transition-colors disabled:pointer-events-none shadow-md shadow-brand-red/20'
										>
											Continue <Send size={18} />
										</motion.button>
									</div>
								)}

								{error && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className='text-red-400 text-sm mt-4 text-center font-medium absolute -bottom-8 w-full'
									>
										Oops! Try again, my love!
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
						className='text-center px-6 relative z-10'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", delay: 0.2, damping: 15 }}
							className='w-24 h-24 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,0,51,0.5)] border-4 border-black'
						>
							<CheckCircle2 size={48} className='text-white' strokeWidth={2.5} />
						</motion.div>

						<h2 className='text-5xl font-bold text-gray-900 mb-4 tracking-tight'>
							You passed!
						</h2>
						<p className='text-zinc-600 max-w-sm mx-auto mb-10 leading-relaxed text-lg'>
							Good job! Just so you know, the answers change every
							week regardless - so don&apos;t be too excited. 😉
						</p>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={onComplete}
							className='bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-red-dim hover:shadow-[0_0_40px_rgba(255,77,133,0.5)] transition-all duration-300'
						>
							Enter Journal
						</motion.button>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
