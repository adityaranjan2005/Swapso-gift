// Navbar.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

interface NavbarProps {
  isMobile: boolean;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

interface Section {
  id: string;
  title: string;
}

const SECTIONS: Section[] = [
  { id: 'why-bitcoin', title: 'Why Bitcoin?' },
  { id: 'why-gift-bitcoin', title: 'Why Gift Bitcoin?' },
  { id: 'why-use-card', title: 'Why Use Bitcoin Card?' }
];

const MenuLink: React.FC<{ href: string; text: string; isScroll?: boolean }> = ({ href, text, isScroll }) => {
  const content = (
    <>
      <p className="text-cyan-400 text-xl font-semibold tracking-wide hover:text-cyan-200 transition-all duration-300">
        {text}
      </p>
      <div className="border-t border-slate-600 w-3/4 mt-3 mx-auto opacity-40" />
    </>
  );

  return (
    <li className="w-full">
      {isScroll ? (
        <ScrollLink to={href.substring(1)} smooth={true} duration={800}>
          {content}
        </ScrollLink>
      ) : (
        <Link href={href}>{content}</Link>
      )}
    </li>
  );
};

const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isComingSoon, setIsComingSoon] = useState(false);

  const handleComingSoon = () => {
    setIsComingSoon(true);
    setTimeout(() => setIsComingSoon(false), 3000);
  };

  // Prevent menu from closing on carousel slide
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`
        fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
      onClick={onClose}
    >
      <div
        className={`
          fixed top-0 right-0 h-full bg-black text-white z-50 w-full sm:w-2/3 lg:w-1/3
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        onClick={handleContentClick}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
          <Link href="/">
            <Image src="/logo.svg" alt="nav-logo" width={120} height={25} />
          </Link>
          <button
            className="text-2xl text-cyan-500 hover:text-white transition duration-300 ease-in-out"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="px-6 py-8 text-center">
          <ul className="space-y-6">
            <MenuLink href="/" text="Home" />
            <MenuLink href="#Ecosystem" text="Products" isScroll />
            <MenuLink href="/gifting" text="Gifting" />
            
            <li className="pt-4">
              <button
                className="w-full bg-cyan-500 text-black font-semibold rounded-full px-6 py-3 hover:bg-cyan-400 hover:text-slate-800 shadow-lg shadow-cyan-500/20 transition duration-300"
                onClick={handleComingSoon}
              >
                {isComingSoon ? "Coming Soon..." : "Launch App"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({ isMobile, activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleComingSoon = () => {
    setIsComingSoon(true);
    setTimeout(() => setIsComingSoon(false), 3000);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-10 text-center bg-black shadow-lg">
          <div className="flex justify-between items-center h-12 px-6">
            <Link href="/">
              <Image src="/logo.svg" alt="nav-logo" width={100} height={25} />
            </Link>
            <button
              className="text-2xl text-cyan-500 hover:text-white transition duration-300 ease-in-out"
              onClick={() => setIsOpen(true)}
            >
              <FaBars />
            </button>
          </div>
        </header>
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-black/40 backdrop-blur-sm' 
            : 'bg-black/40 backdrop-blur-sm' 
          }
        `}
      >
        <nav className="container mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image src="/swapso.svg" alt="Swapso Logo" width={100} height={100} />
            </Link>
            <div className="flex space-x-8 text-gray-400 text-lg">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/gifting" className="hover:text-white transition-colors">
                Gifting
              </Link>
            </div>
            <button 
              className="bg-[#20D3F1] rounded-xl font-semibold text-black px-8 py-2 hover:bg-[#1ba8c0] transition-colors"
              onClick={handleComingSoon}
            >
              {isComingSoon ? "Coming Soon..." : "Launch App"}
            </button>
          </div>
        </nav>
      </header>

      {/* Section Navigation */}
      <div className={`
        w-full fixed left-0 right-0 z-40 

        ${isScrolled ? 'top-[64px]' : 'top-[72px]'} // Modified these values from [72px] and [100px]

      `}>
        <div className="w-full mx-auto">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg mx-6">
            <div className="flex justify-center items-center py-2">
              {SECTIONS.map(({ id, title }, index) => (
                <React.Fragment key={id}>
                  {/* Section Button */}
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`
                      transition-all duration-300 ease-in-out px-4
                      ${activeSection === id 
                        ? 'text-4xl md:text-5xl text-white' 
                        : 'text-lg md:text-xl text-[#585858] hover:text-white'
                      }
                    `}
                  >
                    {title}
                  </button>

                  {/* Connecting Line (don't add after last item) */}
                  {index < SECTIONS.length - 1 && (
                    <div className="h-[2px] w-24 mx-4">
                    <div 
                      className={`h-full transition-colors duration-300`}
                      style={{
                        background: activeSection === id || activeSection === SECTIONS[index + 1].id
                          ? 'linear-gradient(270deg, rgba(88, 88, 88, 0) -50.17%, #585858 53.74%, rgba(88, 88, 88, 0) 143.5%)'
                          : 'linear-gradient(270deg, rgba(88, 88, 88, 0) -50.17%, #585858 53.74%, rgba(88, 88, 11, 0) 143.5%)'
                      }}
                    />
                  </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;