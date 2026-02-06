import { getBlogPost, urlFor } from "@/utils/sanity";
import { PortableText } from "@portabletext/react";
import ScrollMonitor from "@/components/ScrollMonitor";
import LoveConclusion from "@/components/LoveConclusion";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

// Define components for PortableText to style them
const ptComponents = {
	block: {
		h1: ({ children }: any) => (
			<h1 className='text-3xl font-bold text-white mt-8 mb-4'>
				{children}
			</h1>
		),
		h2: ({ children }: any) => (
			<h2 className='text-2xl font-semibold text-brand-red mt-8 mb-4'>
				{children}
			</h2>
		),
		h3: ({ children }: any) => (
			<h3 className='text-xl font-medium text-white mt-6 mb-3'>
				{children}
			</h3>
		),
		normal: ({ children }: any) => (
			<p className='text-lg text-zinc-300 leading-relaxed mb-6'>
				{children}
			</p>
		),
		blockquote: ({ children }: any) => (
			<blockquote className='border-l-4 border-brand-red pl-4 py-2 italic text-zinc-400 my-6 bg-zinc-900/50 rounded-r-lg'>
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }: any) => (
			<ul className='list-disc pl-5 mb-6 space-y-2 text-zinc-300'>
				{children}
			</ul>
		),
		number: ({ children }: any) => (
			<ol className='list-decimal pl-5 mb-6 space-y-2 text-zinc-300'>
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
		<div className='min-h-screen bg-black text-white selection:bg-brand-red selection:text-white pb-32'>
			<ScrollMonitor />

			{/* Navigation */}
			<nav className='fixed top-0 left-0 p-6 z-40'>
				<Link
					href='/'
					className='flex items-center gap-2 text-zinc-500 hover:text-white transition-colors bg-black/50 backdrop-blur-md px-4 py-2 rounded-full'
				>
					<ArrowLeft size={20} />
					<span className='text-sm font-medium'>Back</span>
				</Link>
			</nav>

			{/* Content Container */}
			<article className='max-w-2xl mx-auto px-6 pt-32'>
				<header className='mb-12 text-center'>
					{post.mainImage && (
						<div className='mb-8 rounded-2xl overflow-hidden aspect-video relative shadow-2xl shadow-brand-red/10'>
							{/* In a real app, use next/image with the sanity url builder */}
							<img
								src={urlFor(post.mainImage).width(800).url()}
								alt={post.title}
								className='object-cover w-full h-full'
							/>
						</div>
					)}

					<div className='flex items-center justify-center gap-2 text-brand-red mb-4 text-sm font-medium tracking-widest uppercase'>
						<Calendar size={14} />
						<span>
							{new Date(post.publishedAt).toLocaleDateString()}
						</span>
					</div>

					<h1 className='text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6'>
						{post.title}
					</h1>
				</header>

				<div className='prose prose-invert prose-lg max-w-none'>
					<PortableText value={post.body} components={ptComponents} />
				</div>

				{/* The Conclusion Trigger */}
				<LoveConclusion />
			</article>
		</div>
	);
}
