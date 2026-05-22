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
					WELCOME
				</h1>
			</header>

			{/* <PhotoGallery /> */}

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
