import { socials, headerLinks } from "@/utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-white text-main border-t border-gray-200'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Main Footer Content */}
				<div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Brand Section */}
					<div className='lg:col-span-2'>
						<Link href='/' className='inline-block mb-4'>
							<span className='text-2xl font-bold text-gray-900 hover:text-main transition-colors duration-200'>
								Olutunmise
							</span>
						</Link>
						<p className='text-main mb-6 max-w-md leading-relaxed'>
							Full-stack developer passionate about creating
							innovative software solutions. Let's build something
							amazing together.
						</p>

						{/* Social Links */}
						<div className='flex space-x-4'>
							{socials.map((social) => (
								<a
									key={social.name}
									href={social.url}
									target='_blank'
									rel='noopener noreferrer'
									className='group p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-110'
									aria-label={`Follow on ${social.name}`}
								>
									<Icon
										icon={social.icon}
										className='w-5 h-5 text-main group-hover:text-gray-900 transition-colors duration-200'
									/>
								</a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-gray-900'>
							Quick Links
						</h3>
						<ul className='space-y-2'>
							{headerLinks.map((link) => (
								<li key={link.title}>
									<Link
										href={link.link}
										className='text-main hover:text-gray-900 transition-colors duration-200 block py-1'
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-gray-900'>
							Get In Touch
						</h3>
						<div className='space-y-3'>
							<a
								href='mailto:tadeniji06@gmail.com'
								className='flex items-center text-main hover:text-gray-900 transition-colors duration-200'
							>
								<Icon
									icon='mdi:email-outline'
									className='w-5 h-5 mr-2'
								/>
								<span className='text-sm'>tadeniji06@gmail.com</span>
							</a>

							<a
								href='tel:+2349127936598'
								className='flex items-center text-main hover:text-gray-900 transition-colors duration-200'
							>
								<Icon
									icon='mdi:phone-outline'
									className='w-5 h-5 mr-2'
								/>
								<span className='text-sm'>+234 912 793 6598</span>
							</a>

							<div className='flex items-center text-main'>
								<Icon
									icon='mdi:map-marker-outline'
									className='w-5 h-5 mr-2'
								/>
								<span className='text-sm'>Lagos, Nigeria</span>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='border-t border-gray-200 py-6'>
					<div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
						<p className='text-gray-500 text-sm text-center md:text-left'>
							© {currentYear} Olutunmise Adeniji. All rights reserved.
						</p>

						<div className='flex space-x-6 text-sm'>
							<Link
								href='/'
								className='text-gray-500 hover:text-gray-900 transition-colors duration-200'
							>
								Privacy Policy
							</Link>
							<Link
								href='/'
								className='text-gray-500 hover:text-gray-900 transition-colors duration-200'
							>
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
