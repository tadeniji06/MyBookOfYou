import Link from "next/link";
import { HeartCrack } from "lucide-react";

export default function NotFound() {
	return (
		<div className='h-screen w-full flex flex-col items-center justify-center gap-6 bg-black text-white'>
			<HeartCrack size={80} className='text-zinc-800' />
			<h2 className='text-2xl font-bold'>Lost in Love?</h2>
			<p className='text-zinc-500'>
				The page you are looking for does not exist.
			</p>
			<Link
				href='/'
				className='px-6 py-3 bg-brand-red text-white rounded-full font-medium hover:bg-brand-red-dim transition-colors'
			>
				Return Home
			</Link>
		</div>
	);
}
