import {
	awo,
	b360,
	exp,
	g1,
	g2,
	imperia,
	m360,
	opal,
	sa,
	tech,
	vedura,
} from "@/assets";

export const webApplications = [
	{
		title: "Gidswap Exchange",
		stack: [
			{
				title:
					"Next.js, Node.js, Express.js, MongoDB, Redux, TailwindCSS",
				icon: "",
			},
		],
		url: "https://gidswap.com",
		description:
			"A decentralized exchange for trading cryptocurrencies. crypto to crypto and crypto to fiat.",
		images: [g1, g2],
	},
];

export const websiteProjects = [
	{
		title: "Opalite Properties, Lagos, Nigeria",
		desc: "Website for a Real Estate & Consulting Firm in Lagos",
		url: "https://opaliteproperties.com",
		image: opal,
	},
	{
		title: "Imperia Consulting, Nairobi, Kenya",
		desc: "Website for a Real Estate & Consulting Firm in Kenya",
		url: "https://imperiagrouponline.com",
		image: imperia,
	},
	{
		title: "M360 Solutions Limited, Lagos, Nigeria",
		desc: "Website for Marketing and Brand Building Organization",
		url: "https://m360solutionsgroup.com",
		image: m360,
	},
	{
		title: "Explore 360",
		desc: "Website for a Travel and Tours company",
		url: "https://theexplore360.com",
		image: exp,
	},
	{
		title: "ShowcaseAfrica Online",
		desc: "A platform showcasing African culture, art, business and tourism through media.",
		url: "https://showcaseafricaonline.com",
		image: sa,
	},
	{
		title: "The B360 Group",
		desc: `A group of companies driving business growth through
Strategic Marketing, technology, Business expansion and
Content Solutions`,
		url: "https://www.theb360group.com",
		image: b360,
	},
	{
		title: "Awo Tech Mall, Lagos, Nigeria",
		desc: "Realtor, RealEstate and TechMall all in one, ikeja, Lagos",
		url: "https://awotechmall.com",
		image: awo,
	},
	{
		title: "BTech 360, Lagos, Nigeria",
		desc: "A website for a business automation company, showcasing their services and products",
		url: "https://tech360online.com",
		image: tech,
	},
	{
		title: "Vedura Resort, Lagos, Nigeria",
		desc: "Website for a resort in Lagos, Nigeria",
		url: "https://vedura.ng",
		image: vedura,
	},
];

export const apiService = [
	{
		title: "Trading Simulator API",
		description:
			"A RESTful API for the Trading Simulator, providing data and functionality for the trading simulator.",
		repo: "https://github.com/tadeniji06/Trading-Network-API",
		tech: ["Node.js", "Mongo DB", "Express.js", "CoinGecko API"],
		docs: "",
	},
];
