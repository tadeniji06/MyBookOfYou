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
					<span className='absolute -top-3 left-4 px-4 py-1.5 bg-gradient-to-r from-brand-red to-brand-red-dim text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full z-20 shadow-lg shadow-brand-red/20'>
						Latest Love Note
					</span>
				</div>
				<Link href={`/read/${latestPost.slug.current}`}>
					<div className='group relative glass-panel rounded-3xl p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:border-brand-red/50 hover:shadow-[0_0_40px_rgba(230,0,38,0.2)]'>
						{/* Background Glow */}
						<div className='absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

						<div className='relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center'>
							<div className='bg-white/80 border border-brand-red/20 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500 flex-shrink-0 backdrop-blur-sm shadow-sm'>
								{latestPost.mainImage ? (
									<div className='w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shadow-inner'>
										<img
											src={urlFor(latestPost.mainImage)
												.width(100)
												.url()}
											alt='thumb'
											className='w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700'
										/>
									</div>
								) : (
									<Mail size={32} className='text-brand-red drop-shadow-md' />
								)}
							</div>

							<div className='flex-1 space-y-2'>
								<div className='flex items-center gap-3'>
									<p className='text-zinc-500 text-xs font-mono tracking-wider'>
										{new Date(
											latestPost.publishedAt,
										).toLocaleDateString(undefined, {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
									<span className='h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse shadow-[0_0_10px_rgba(255,77,133,0.8)]' />
								</div>
								<h3 className='text-3xl font-bold text-gray-900 group-hover:text-gradient-red transition-all duration-300 leading-tight'>
									{latestPost.title}
								</h3>
								<p className='text-zinc-600 text-sm line-clamp-2 leading-relaxed group-hover:text-zinc-500 transition-colors'>
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
					<h4 className='flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-6 px-2'>
						<BookOpen size={14} className="text-brand-red/70" />
						Memory Lane
					</h4>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
						{previousPosts.map((post) => (
							<Link
								key={post._id}
								href={`/read/${post.slug.current}`}
							>
								<div className='group glass-panel rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-[0_10px_30px_rgba(255,77,133,0.1)]'>
									<div className='flex justify-between items-start mb-4'>
										<span className='text-zinc-500 text-[10px] font-mono border border-zinc-200 bg-white/50 px-3 py-1 rounded-full tracking-wider'>
											{new Date(
												post.publishedAt,
											).toLocaleDateString()}
										</span>
									</div>
									<h5 className='text-lg font-semibold text-gray-800 group-hover:text-brand-red transition-colors line-clamp-2 leading-snug'>
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
