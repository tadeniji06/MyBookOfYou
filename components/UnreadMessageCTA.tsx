import { getBlogPosts } from "@/utils/sanity";
import Link from "next/link";
import { Mail } from "lucide-react";

export default async function UnreadMessageCTA() {
	const posts = await getBlogPosts(1);
	const latestPost = posts[0];

	if (!latestPost) return null;

	return (
		<div className='w-full max-w-md mx-auto p-6'>
			<Link href={`/read/${latestPost.slug.current}`}>
				<div className='group relative bg-brand-gray border border-zinc-800 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all hover:border-brand-red hover:shadow-[0_0_20px_rgba(255,0,51,0.2)]'>
					<div className='flex items-center gap-4'>
						<div className='bg-brand-red/20 p-3 rounded-full group-hover:bg-brand-red group-hover:text-white transition-colors text-brand-red'>
							<Mail size={24} />
						</div>
						<div>
							<p className='text-zinc-400 text-xs font-medium uppercase tracking-wider'>
								New Message
							</p>
							<h3 className='text-xl font-bold text-white group-hover:text-brand-red transition-colors line-clamp-1'>
								{latestPost.title}
							</h3>
						</div>
					</div>

					{/* Unread indicator */}
					<span className='absolute top-4 right-4 h-3 w-3 bg-brand-red rounded-full animate-pulse shadow-[0_0_8px_#ff0033]' />
				</div>
			</Link>
		</div>
	);
}
