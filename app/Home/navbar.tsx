"use client";
import React, { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Puff } from 'react-loader-spinner';
import "./navbar.css";


const Navbar = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const navbarRef = useRef(null);
  const delta = 5;

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [isComingSoon, setIsComingSoon] = useState(false);

  const comingSoon = () => {
    setIsComingSoon(true);
    setTimeout(() => {
      setIsComingSoon(false);
    }, 3000);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const currentScroll = window.scrollY || 0;
      const navbar: any = navbarRef.current;

      if (!navbar) return;

      if (Math.abs(lastScrollTop - currentScroll) <= delta) return;

      if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }

      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    const navbar: any = navbarRef.current;
    if (navbar) {
      navbar.style.transition = "transform 0.3s ease";
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const handleRouteChange = (url : any) => {
    startTransition(() => {
      router.push(url);
    });
  };

  return (
    <>
      {isPending && (
        <div className="loader-container">
          <Puff color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <div>
      <nav className="fixed top-0 left-0 w-full z-10 bg-[#ACA9A91A] px-6 md:px-16 py-4 flex justify-between items-center" ref={navbarRef}>
        <div>
          <Image src="/swapso.svg" alt="Swapso Logo" width={100} height={100} />
        </div>
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
        className="bg-[#20D3F1] rounded-xl font-semibold text-black px-8 py-2" 
        onClick={comingSoon}
        >
        {
        isComingSoon ? <p>Coming Soon...</p>: <p>Launch App</p> 
        }
          </button>
      </nav>
      </div>
    </>
  );
};

export default Navbar;

