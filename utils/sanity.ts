import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Define types for better TypeScript support
export interface Author {
	_id: string;
	name: string;
	image?: SanityImageSource;
	bio?: string;
}

export interface Category {
	_id: string;
	title: string;
}

export interface BlogPost {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	author?: Author;
	mainImage?: SanityImageSource;
	categories?: Category[];
	publishedAt: string;
	body: any[];
	estimatedReadingTime: number;
}

export const client = createClient({
	projectId: "a15t1td1",
	dataset: "production",
	useCdn: true,
	apiVersion: "2023-01-01",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) =>
	builder.image(source);

// Query functions with proper typing
export const getBlogPosts = async (
	limit = 10,
	offset = 0
): Promise<BlogPost[]> => {
	const query = `*[_type == "post"] | order(publishedAt desc) [${offset}...${
		offset + limit
	}] {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      image
    },
    mainImage,
    categories[]->{
      _id,
      title
    },
    publishedAt,
    body[0...2],
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }`;

	return await client.fetch(query);
};

export const getBlogPost = async (
	slug: string
): Promise<BlogPost | null> => {
	// Clean the slug
	const cleanSlug = slug?.trim();

	if (!cleanSlug) {
		console.error("No slug provided to getBlogPost");
		return null;
	}

	const query = `*[_type == "post" && slug.current == $slug][0] {
		_id,
		title,
		slug,
		author->{
			_id,
			name,
			image,
			bio
		},
		mainImage,
		categories[]->{
			_id,
			title
		},
		publishedAt,
		body,
		"estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
	}`;

	try {
		const result = await client.fetch(query, { slug: cleanSlug });
		console.log("Sanity query result:", result);
		return result;
	} catch (error) {
		console.error("Sanity query error:", error);
		return null;
	}
};

export const getRelatedPosts = async (
	categories: Category[],
	currentPostId: string,
	limit = 3
): Promise<BlogPost[]> => {
	const query = `*[_type == "post" && _id != $currentPostId && count((categories[]._ref)[@ in $categories]) > 0] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    author->{
      _id,
      name
    },
    mainImage,
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }`;

	return await client.fetch(query, {
		categories: categories?.map((cat) => cat._id) || [],
		currentPostId,
	});
};

export const searchPosts = async (
	searchTerm: string
): Promise<BlogPost[]> => {
	const query = `*[_type == "post" && (title match $searchTerm || pt::text(body) match $searchTerm)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{
      _id,
      name
    },
    mainImage,
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }`;

	return await client.fetch(query, { searchTerm: `*${searchTerm}*` });
};

export const getCategories = async (): Promise<Category[]> => {
	const query = `*[_type == "category"] | order(title asc) {
    _id,
    title
  }`;

	return await client.fetch(query);
};

export const getBlogPostsForSitemap = async () => {
	const query = `*[_type == "post"] | order(publishedAt desc) {
    slug,
    publishedAt
  }`;
	return await client.fetch(query);
};