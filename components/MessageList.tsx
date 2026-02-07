import { getBlogPosts, urlFor } from "@/utils/sanity";
import Link from "next/link";
import { Mail, BookOpen } from "lucide-react";

export default async function MessageList() {
	const posts = await getBlogPosts(100); 

	if (!posts || posts.length === 0) return null;

	const latestPost = posts[0];
	const previousPosts = posts.slice(1);

	return (
		<div className='w-full max-w-2xl mx-auto space-y-12'>
			{/* Featured: Latest Message - Animated & Prominent */}
			<div className='w-full'>
				<div className='relative mb-6'>
					<span className='absolute -top-3 left-4 px-3 py-1 bg-brand-red text-white text-xs font-bold uppercase tracking-widest rounded-full z-20'>
						Latest Love Note
					</span>
				</div>
				<Link href={`/read/${latestPost.slug.current}`}>
					<div className='group relative bg-brand-gray border border-zinc-800 rounded-3xl p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:border-brand-red hover:shadow-[0_0_30px_rgba(255,0,51,0.15)]'>
						{/* Background Glow */}
						<div className='absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

						<div className='relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center'>
							<div className='bg-zinc-900 border border-zinc-800 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500 flex-shrink-0'>
								{latestPost.mainImage ? (
									<div className='w-12 h-12 rounded-lg overflow-hidden bg-zinc-800'>
										<img
											src={urlFor(latestPost.mainImage)
												.width(100)
												.url()}
											alt='thumb'
											className='w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity'
										/>
									</div>
								) : (
									<Mail size={32} className='text-brand-red' />
								)}
							</div>

							<div className='flex-1 space-y-2'>
								<div className='flex items-center gap-3'>
									<p className='text-zinc-500 text-xs font-mono'>
										{new Date(
											latestPost.publishedAt,
										).toLocaleDateString(undefined, {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
									<span className='h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse' />
								</div>
								<h3 className='text-3xl font-bold text-white group-hover:text-brand-red transition-colors duration-300 leading-tight'>
									{latestPost.title}
								</h3>
								<p className='text-zinc-400 text-sm line-clamp-2 leading-relaxed group-hover:text-zinc-300 transition-colors'>
									Click to open your heart...
								</p>
							</div>
						</div>
					</div>
				</Link>
			</div>

			{/* Archive Grid - Previous Messages */}
			{previousPosts.length > 0 && (
				<div className='opacity-80 hover:opacity-100 transition-opacity duration-500'>
					<h4 className='flex items-center gap-2 text-zinc-500 text-sm font-bold uppercase tracking-widest mb-6 px-2'>
						<BookOpen size={14} />
						Memory Lane
					</h4>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{previousPosts.map((post) => (
							<Link
								key={post._id}
								href={`/read/${post.slug.current}`}
							>
								<div className='group bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900 rounded-xl p-5 transition-all hover:-translate-y-1'>
									<div className='flex justify-between items-start mb-3'>
										<span className='text-zinc-600 text-[10px] font-mono border border-zinc-800 px-2 py-0.5 rounded-full'>
											{new Date(
												post.publishedAt,
											).toLocaleDateString()}
										</span>
									</div>
									<h5 className='text-lg font-semibold text-zinc-200 group-hover:text-brand-red transition-colors line-clamp-1 mb-1'>
										{post.title}
									</h5>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
