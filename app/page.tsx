import InteractiveHeart from "@/components/InteractiveHeart";
import PhotoGallery from "@/components/PhotoGallery";
import MessageList from "@/components/MessageList";
import HomeClientWrapper from "@/components/HomeClientWrapper";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<HomeClientWrapper>
			{/* Header Section */}
			<header className='text-center space-y-6'>
				<h1 className='text-5xl md:text-7xl font-bold text-gradient-red tracking-tighter drop-shadow-lg'>
					MY BOOK OF YOU
				</h1>
				<p className='text-zinc-400 text-sm md:text-base tracking-[0.3em] uppercase font-medium'>
					A Journal of Us
				</p>
			</header>

			{/* Peak Interactive UI - Mini Game */}
			<InteractiveHeart />

			{/* Photos Section */}
			<PhotoGallery />

			{/* CTA Section */}
			<div className='w-full mt-20'>
				<MessageList />
			</div>

			<footer className='w-full py-6 text-center text-zinc-800 text-xs z-10'>
				made with love for you
			</footer>
		</HomeClientWrapper>
	);
}
