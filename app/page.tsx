import InteractiveHeart from "@/components/InteractiveHeart";
import PhotoGallery from "@/components/PhotoGallery";
import MessageList from "@/components/MessageList";
import HomeClientWrapper from "@/components/HomeClientWrapper";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<HomeClientWrapper>
			{/* Header Section */}
			<header className='text-center space-y-4'>
				<h1 className='text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-600 tracking-tighter'>
					MY BOOK OF YOU
				</h1>
				<p className='text-zinc-500 text-sm md:text-base tracking-widest uppercase'>
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
