"use client";

import { headerLinks } from "@/utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<header className='sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<nav className='flex items-center justify-between h-16'>
					{/* Logo/Brand */}
					<Link href={"/"} className='flex-shrink-0'>
						<span className='text-xl font-bold text-gray-900 hover:text-gray-600 transition-colors duration-200'>
							Tunmise E.A 
						</span>
					</Link>

					{/* Desktop Navigation */}
					<ul className='hidden md:flex items-center space-x-8'>
						{headerLinks.map((link) => (
							<li key={link.title}>
								<Link
									href={link.link}
									className='text-main hover:text-gray-700 font-medium transition-colors duration-200 relative group'
								>
									{link.title}
									<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-200 group-hover:w-full'></span>
								</Link>
							</li>
						))}
					</ul>

					{/* Mobile menu button */}
					<button
						onClick={toggleMobileMenu}
						className='md:hidden inline-flex items-center justify-center p-2 rounded-md hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-colors duration-200'
						aria-expanded='false'
						aria-label='Toggle navigation menu'
					>
						<Icon
							icon={
								isMobileMenuOpen
									? "mdi:cancel-bold"
									: "mdi:hamburger-open"
							}
							className='h-6 w-6 text-main'
						/>
					</button>
				</nav>

				{/* Mobile Navigation Menu */}
				<div
					className={`md:hidden transition-all duration-300 ease-in-out ${
						isMobileMenuOpen
							? "max-h-96 opacity-100 visible"
							: "max-h-0 opacity-0 invisible overflow-hidden"
					}`}
				>
					<div className='px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200'>
						{headerLinks.map((link) => (
							<Link
								key={link.title}
								href={link.link}
								onClick={closeMobileMenu}
								className='block px-3 py-2 text-base font-medium text-main hover:bg-gray-50 rounded-md transition-colors duration-200'
							>
								{link.title}
							</Link>
						))}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
