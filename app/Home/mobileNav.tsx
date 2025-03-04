import Link from 'next/link';
import Image from 'next/image';
import './mobile.css';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isComingSoon, setIsComingSoon] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const comingSoon = () => {
    setIsComingSoon(true);
    setTimeout(() => {
      setIsComingSoon(false);
    }, 3000);
  };

  return (
    <nav className="fixed top-0 right-0 w-full h-16 bg-black shadow-lg z-50">
      <div className="flex justify-between items-center h-full px-6">
        <p></p>
        <button
          className="text-2xl text-cyan-500 hover:text-white transition duration-300 ease-in-out"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-black text-white z-40 w-full sm:w-2/3 lg:w-1/3 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-5 right-5 text-2xl text-cyan-500 hover:text-white transition duration-300 ease-in-out"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <FaTimes />
        </button>
        <Link href="/">
          <Image src="/logo.svg" alt="nav-logo" width={120} height={25} className='mt-4' />
        </Link>
        <ul className="flex flex-col items-start h-full space-y-6 mt-10 text-slate-200 w-full">
  {/* Home Link */}
  <li className="w-full">
    <Link href="/">
      <p className="text-cyan-400 text-xl font-semibold tracking-wide hover:text-cyan-200 transition-all duration-300">
        Home
      </p>
    </Link>
    <div className="border-t border-slate-600 w-3/4 mt-3 mx-auto opacity-40" />
  </li>

  {/* Ecosystem Link */}
  <li className="w-full">
    <Link href="/products">
      <p className="text-cyan-400 text-xl font-semibold tracking-wide hover:text-cyan-200 transition-all duration-300">
        Products
      </p>
    </Link>
    <div className="border-t border-slate-600 w-3/4 mt-3 mx-auto opacity-40" />
  </li>

  {/* Academy External Link */}
  <li className="w-full">
    <Link href="/gifting" target="_blank" rel="noopener noreferrer">
      <p className="text-cyan-400 text-xl font-semibold tracking-wide hover:text-cyan-200 transition-all duration-300">
        Gifting
      </p>
    </Link>
    <div className="border-t border-slate-600 w-3/4 mt-3 mx-auto opacity-40" />
  </li>

  {/* Launch App Button */}
  <li className="w-full mt-4">
    <button
      className="bg-cyan-500 text-black font-semibold rounded-full px-6 py-3 hover:bg-cyan-400 hover:text-slate-800 shadow-lg shadow-cyan-500/20 transition duration-300"
      onClick={comingSoon}
    >
      {isComingSoon ? "Coming Soon..." : "Launch App"}
    </button>
  </li>
</ul>

      </div>
    </nav>
  );
};

export default MobileNavbar;
