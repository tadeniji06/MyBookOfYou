import type { MetadataRoute } from "next";
import { getBlogPostsForSitemap } from "@/utils/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Fetch all blog posts from Sanity (optimized for sitemap)
	const blogPosts = await getBlogPostsForSitemap();

	// Create sitemap entries for blog posts
	const blogEntries: MetadataRoute.Sitemap = blogPosts.map(
		(post: any) => ({
			url: `https://mybookofyou.app/read/${post.slug.current}`,
			lastModified: new Date(post.publishedAt),
			changeFrequency: "daily" as const,
			priority: 0.8,
		}),
	);

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: "https://mybookofyou.app",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
	];

	// Combine static pages and blog entries
	return [...staticPages, ...blogEntries];
}
