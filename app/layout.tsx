import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "My Book of You",
	description: "A digital journal of our love.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='antialiased bg-black text-white selection:bg-brand-red selection:text-white'>
				<main className='min-h-screen flex flex-col'>{children}</main>
			</body>
		</html>
	);
}
