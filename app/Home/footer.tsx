import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  const navItems = [
    { label: 'Team', href: '/team' },
    { label: 'T&C', href: '/t&c' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'FAQs', href: '/' },
  ];

  const socialLinks = [
    { 
      icon: '/linkedin.svg', 
      href: 'https://www.linkedin.com/company/swapso/',
      alt: 'LinkedIn'
    },
    { 
      icon: '/x.svg', 
      href: 'https://x.com/swapso_',
      alt: 'X (Twitter)'
    },
    { 
      icon: '/telegram.svg', 
      href: '',
      alt: 'Telegram'
    },
    { 
      icon: '/instagram.svg', 
      href: 'https://www.instagram.com/swapso.io/',
      alt: 'Instagram'
    },
    { 
      icon: '/discord.svg', 
      href: 'https://discord.com/channels/1088631148156039231/1088631149213003834',
      alt: 'Discord'
    },
  ];

  return (
    <>
    <div className="relative top-0 h-[2px] w-1/2 mx-auto bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000] mt-12"></div>
    <footer className="py-8 px-6 md:px-12 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div>
            <Image 
              src="/logo.svg" 
              alt="SwapSo Logo" 
              width={150} 
              height={40}
              className="h-auto"
            />
          </div>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className="text-white hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <button className="px-6 py-2 rounded-full border border-gray-800 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors">
            contact@swapso.io
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <Link 
                key={social.alt} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image 
                  src={social.icon} 
                  alt={social.alt} 
                  width={32} 
                  height={32}
                  className="h-auto"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-white">
          © {new Date().getFullYear()} SwapSo. All Rights Reserved.
        </div>
      </div>
    </footer>
    </>

  );
};

export default Footer;