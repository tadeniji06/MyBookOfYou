import { getBlogPost, urlFor } from "@/utils/sanity";
import { PortableText } from "@portabletext/react";
import AppreciationCTA from "@/components/AppreciationCTA";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic";

// Define components for PortableText to style them
const ptComponents = {
	block: {
		h1: ({ children }: any) => (
			<h1 className='text-3xl font-bold text-gray-900 mt-8 mb-4'>
				{children}
			</h1>
		),
		h2: ({ children }: any) => (
			<h2 className='text-2xl font-semibold text-brand-red mt-8 mb-4'>
				{children}
			</h2>
		),
		h3: ({ children }: any) => (
			<h3 className='text-xl font-medium text-gray-800 mt-6 mb-3'>
				{children}
			</h3>
		),
		normal: ({ children }: any) => (
			<p className='text-lg text-zinc-600 leading-relaxed mb-6 font-medium'>
				{children}
			</p>
		),
		blockquote: ({ children }: any) => (
			<blockquote className='border-l-4 border-brand-red pl-4 py-3 italic text-zinc-600 my-6 bg-white/60 rounded-r-xl shadow-sm'>
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }: any) => (
			<ul className='list-disc pl-5 mb-6 space-y-2 text-zinc-600 font-medium'>
				{children}
			</ul>
		),
		number: ({ children }: any) => (
			<ol className='list-decimal pl-5 mb-6 space-y-2 text-zinc-600 font-medium'>
				{children}
			</ol>
		),
	},
};

export default async function ReadPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) {
		notFound();
	}

	return (
		<div className='min-h-screen text-gray-900 selection:bg-brand-red selection:text-white pb-32'>
			{/* Navigation */}
			<nav className='fixed top-0 left-0 p-6 z-40'>
				<Link
					href='/'
					className='flex items-center gap-2 text-zinc-600 hover:text-gray-900 transition-colors bg-white/70 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-brand-red/10 hover:border-brand-red/30'
				>
					<ArrowLeft size={20} />
					<span className='text-sm font-bold tracking-widest uppercase'>Back</span>
				</Link>
			</nav>

			{/* Content Container */}
			<article className='max-w-2xl mx-auto px-6 pt-32'>
				<header className='mb-12 text-center'>
					{post.mainImage && (
						<div className='mb-8 rounded-3xl overflow-hidden aspect-video relative shadow-[0_20px_50px_rgba(255,77,133,0.15)] border-4 border-white'>
							{/* In a real app, use next/image with the sanity url builder */}
							<img
								src={urlFor(post.mainImage).width(800).url()}
								alt={post.title}
								className='object-cover w-full h-full hover:scale-105 transition-transform duration-700'
							/>
						</div>
					)}

					<div className='flex items-center justify-center gap-2 text-brand-red mb-4 text-xs font-bold tracking-widest uppercase bg-white/50 w-fit mx-auto px-4 py-1.5 rounded-full'>
						<Calendar size={14} />
						<span>
							{new Date(post.publishedAt).toLocaleDateString()}
						</span>
					</div>

					<h1 className='text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 text-gray-900 drop-shadow-sm'>
						{post.title}
					</h1>
				</header>

				<div className='prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-zinc-600'>
					<PortableText value={post.body} components={ptComponents} />
				</div>

				{/* The new Appreciation CTA Button */}
				<AppreciationCTA />
			</article>
		</div>
	);
}
