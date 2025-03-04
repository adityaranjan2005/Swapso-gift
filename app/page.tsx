"use client";
import Image from "next/image";
import Footer from "./Home/footer";
import "../app/Home/navbar.css";
import Link from "next/link";
// import CustomCursor from './Home/customCursor';
// import {About} from './Home/about';
// import { About2 } from "./Home/about2";
import Navbar from "./Home/navbar";
import React, { useEffect, useState } from "react";
import MobileNavbar from "./Home/mobileNav";

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isComingSoon, setIsComingSoon] = useState(false);

  const comingSoon = () => {
    setIsComingSoon(true);
    setTimeout(() => {
      setIsComingSoon(false);
    }, 3000);
  };

  

  return (
    <>
    {/* <CustomCursor /> */}
    <div className="text-center items-center justify-center">
      <div className="justify-center mt-2">
        {isMobile ? <MobileNavbar /> : <Navbar />}
      </div>
      <div className="w-[300px] h-[350px] md:w-[600px] md:h-[600px] bg-[#CBFBFF] opacity-20 rounded-[50%] absolute z-[1] top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[120px]"></div>
      <div className="flex flex-col items-center justify-center z-10" id="start">
        <button 
        className="flex flex-row bg-[linear-gradient(90deg, rgba(52, 125, 137, 0.12) 0.01%, rgba(7, 11, 13, 0.14) 50.5%, rgba(52, 125, 137, 0.12) 100%)] font-poppins px-4 rounded-2xl text-[#5BE9FF] backdrop-blur-lg shadow-inner-custom mt-48 text-center justify-center items-center"
        aria-label="SwapSo Badge"
        >
          <Image src='/Discount.png' width={50} height={50} alt="SwapSo hero image" loading="lazy" />
          Simplifying Bitcoin Finance
        </button>
        <div className="text-4xl md:text-6xl font-bold mt-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-300 to-cyan-400">Finance</span> <span className="bg-gradient-to-b from-white via-white to-gray-900 bg-clip-text text-transparent"> your Bitcoin</span> 
          <br /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-900">with SwapSo</span>
        </div>
        <h3 className="text-[#94969C] mt-8">
          We simplify your journey into Bitcoin—buy, HODL, and finance with ease. 
        </h3>
        <button 
        className="border-2 border-cyan-500 p-2 rounded-xl mt-4 px-12 text-cyan-400"
        onClick={comingSoon}
        aria-label="Get Started"
        >
        {
          isComingSoon ? <p>Coming Soon...</p> : <p>Get Started</p>
        }
        </button>
        <Image src='/hero illu.png' width={800} height={700} alt="hero section image" loading="lazy" />
      </div>
      <div className="text-center mt-24 items-center justify-center">
        <h1 className="mt-16 text-[#FFD700] font-semibold text-xl">About Us</h1>
        <p className="text-white font-semibold text-3xl md:text-4xl mt-4">Bitcoin for All: Your Path to Wealth, Made Simple</p>
        <p className="text-gray-500 text-xl mt-4 mx-auto w-4/5">At Swapso, we are committed to making Bitcoin accessible to everyone. Whether you are a beginner or an experienced investor, our platform offers simple solutions for mass Bitcoin adoption</p>
      </div>
      {/* {isMobile 
        ?
        <div className="mt-8">
          <About2 />
        </div> 
        :
        <div className="mt-8">
          <About />
        </div>
      } */}
      {isMobile ?
      <p></p>:
      <div className="mt-24">
        <Image
          src='/mission.svg'
          className="w-screen h-auto select-none pointer-events-none"
          height={900}
          width={900}
          loading="lazy" 
          alt="our mission"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    }
      <div className="bg-[#050505] mt-32" id="ecosystem">
        <h1 className="text-[#00CEFF] text-xl font-semibold">Our ecosystem</h1>
        <p className="text-white font-semibold text-4xl mt-4">Training, Innovation, and Growth with SwapSo</p>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center mt-12 gap-12">
        <div className="flex flex-col">
          <div className="border-l-[3px] border-b-[3px] border-[#292929] border-[#292929] rounded-xl">
          <div className="relative top-0 h-[2px] w-1/2 ml-32 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
          <Link href='https://www.academy.swapso.io'>
              <h2 className="text-start text-4xl ml-4 mt-4 text-2xl font-bold text-center tracking-wider">SwapSo Academy</h2>
              <p className="text-start text-[#94969C] text-center mt-2 ml-4">An initiative to promote Blockchain education in India</p>
              <Image src='/academy.svg' className="ml-auto" width={330} height={330} alt="SwapSo Academy Image" loading="lazy" />
            </Link>
          </div>
          {isMobile 
            ?
            <div className="border-l-[3px] border-b-[3px] border-[#292929] border-[#292929] rounded-xl">
            <div className="relative top-0 h-[2px] w-1/2 ml-24 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
              <Link href='https://www.btc-india.org'>
              <h2 className="text-start text-4xl ml-4 mt-4 text-2xl font-bold text-center tracking-wider">BTC India</h2>
              <p className="text-[#94969C] text-center mt-2 ml-4">Focused on Bitcoin awareness through quality events</p>
              <Image src='/btcindia.svg' className="w-4/5 h-auto ml-auto" width={330} height={330} alt="BTC India Image" loading="lazy" />
              </Link>
            </div>
            :
        <div className="bg-gradient-to-r border-l-[3px] border-b-[3px] border-[#292929] rounded-xl mt-4 justify-between" style={{ background: 'linear-gradient(135deg, #6B768C, #1C1C1C 10%, #000000 98%)' }}>
          <div className="relative top-0 h-[2px] w-1/2 ml-24 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
          <Link href='https://chat.whatsapp.com/BhOy1b8DeOk6EHRpzOhxG2'>
          <p className="text-3xl text-start ml-4 tracking-wider"><span className="text-[#FFD700]">Bitcoiner?</span> SwapSo is right <br /> place for you.</p>
          <Image src='/ecosystem.svg' className="ml-auto" width={150} height={150} alt="Bitcoiner Image" loading="lazy" />
          </Link>
        </div>
          }
        </div>
        {isMobile 
          ? 
          <div className="bg-gradient-to-r border-l-[3px] border-b-[3px] border-[#292929] rounded-xl mt-4 justify-between" style={{ background: 'linear-gradient(135deg, #6B768C, #1C1C1C 10%, #000000 98%)' }}>
        <div className="relative top-0 h-[2px] w-1/2 ml-24 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
        <Link href='https://chat.whatsapp.com/BhOy1b8DeOk6EHRpzOhxG2'>
        <p className="text-3xl text-start ml-4 tracking-wider"><span className="text-[#FFD700]">Bitcoiner?</span> SwapSo is right <br /> place for you.</p>
        <Image src='/ecosystem.svg' className="ml-auto" width={150} height={150} alt="Bitcoiner Image" loading="lazy" />
        </Link>
      </div>
          :
          <div className="border-l-[3px] border-b-[3px] border-[#292929] border-[#292929] rounded-xl">
          <div className="relative top-0 h-[2px] w-1/2 ml-24 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
          <Link href='https://www.btc-india.org'>
            <h2 className="text-start text-4xl ml-4 mt-4 text-2xl font-bold text-center tracking-wider">BTC India</h2>
            <p className="text-[#94969C] text-center mt-2 ml-4">Focused on Bitcoin awareness through quality events</p>
            <Image src='/btcindia.svg' className="w-4/5 h-auto ml-auto" width={330} height={330} alt="BTC Image" loading="lazy" />
          </Link>
          </div>
        }
      </div>
      <div className="flex items-center justify-center mt-24">
        <Image src='/finance.svg' className="justify-center" width={600} height={330} alt="Banner Image" loading="lazy" />
      </div>
      <div className="flex flex-col md:flex-row w-full mt-12 mx-auto">
        <div className="mx-auto">
          <p className="text-4xl md:text-6xl font-semibold text-start">Finance <br />ur Bitcoins!</p>
          <button 
          className="flex items-center border-2 border-[#FFD700] text-[#FFD700] p-2 rounded-2xl mt-16"
          aria-label="HODL Button"
          >
            <Image src='/coin.svg' height={30} width={30} alt="coin" className="mr-2" loading="lazy" />
            Buy and HODL
          </button>
          <div className="flex items-center mt-8 md:mt-16">
            <Image src='/dollar.svg' height={30} width={40} alt="dollar" className="mr-2" loading="lazy" />
            <p className="text-white text-lg md:text-2xl">Bitcoin to Fiat loans</p>
            <button 
              className=
              "bg-[#11101D] text-white rounded-2xl p-2 ml-2"
              aria-label="Bitcoin to Fiat Loans button"
              >
                Coming soon!</button>
          </div>
          <div className="flex items-center mt-4 md:mt-16">
            <Image src='/btc.svg' height={30} width={40} alt="bitcoin" className="mr-2" loading="lazy" />
            <p className="text-white text-lg md:text-2xl">RWA to Bitcoin loans</p>
            <button 
            className="bg-[#11101D] text-white rounded-2xl p-2 ml-2"
            aria-label="RWA to Bitcoin Loans button"
            >
              Coming soon!</button>
          </div>
        </div>
<div className="mx-auto mt-8 flex flex-col justify-center">
  <Image src='/back_card.svg' className='min-w-[275px] max-w-[400px] h-auto' height={500} width={600} alt="Card Image" />
  
  <div className="flex justify-between items-center w-full mt-4 px-6">
    <p className="text-[#FFD700] text-4xl font-semibold">Rs. 1199</p>
    <Link href = 'https://forms.gle/AvJ659Lq39XecwXJA' target="_blank">
    <button className="bg-[#00CBF7] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#00CBD7] transition duration-300">
      Join Waitlist
    </button>
    </Link>
  </div>
</div>
        
      </div>
      <p className="mt-16 text-[#00CBF7] font-semibold text-xl">Our Communities</p>
      <p className="text-white font-semibold text-4xl mt-4">Connect with SwapSo&apos;s communities</p>
      <div className="flex flex-col mt-8 lg:flex-row mx-auto w-4/5">
        <div className="bg-gradient-to-r rounded-xl mt-4 justify-between mx-auto">
          <div className="relative top-0 h-[1px] w-1/2 ml-24 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
          <div className="flex flex-row mt-4 mb-4">
            <div className="flex flex-col">
              <Link href='https://x.com/swapso_'>
                <p className="text-2xl sm:text-3xl text-start ml-4 tracking-wider">SwapSo on X</p>
                <p className="text-[#94969C] text-center mt-2 ml-4">Follow us for real-time updates</p>
              </Link>
            </div>
            <div>
                <Image src='/x.svg' className="" width={70} height={70} alt="X logo" />
            </div>
          </div>
          <div className="relative top-0 h-[1px] w-1/2 ml-24 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
        </div>
        <div className="bg-gradient-to-r rounded-xl mt-4 justify-between mx-auto">
          <div className="relative top-0 h-[1px] w-1/2 ml-24 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
          <div className="flex flex-row mt-4 mb-4">
            <div className="flex flex-col">
              <Link href='https://chat.whatsapp.com/BhOy1b8DeOk6EHRpzOhxG2'>
              <p className="text-2xl sm:text-3xl text-start ml-4 tracking-wider">Our Community</p>
              <p className="text-[#94969C] text-center mt-2 ml-4">Follow us for real-time updates</p>
              </Link>
            </div>
            <div>
              <Image src='/whatsapp.svg' width={70} height={50} alt="WhatsApp icon" />
            </div>
          </div>
          <div className="relative top-0 h-[1px] w-1/2 ml-24 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
        </div>
        <div className="bg-gradient-to-r rounded-xl mt-4 justify-between mx-auto">
          <div className="relative top-0 h-[1px] w-1/2 ml-24 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
          <div className="flex flex-row mt-4 mb-4">
            <div className="flex flex-col">
            <Link href='https://cip.swapso.io/'>
              <p className="text-2xl sm:text-3xl text-start ml-4 tracking-wider">Join our CIP</p>
              <p className="text-[#94969C] text-center mt-2 ml-4">Explore our program</p>
            </Link>
            </div>
            <div>
              <Image src='/cip.svg' className="" width={70} height={70} alt="CIP icon" />
            </div>
          </div>
          <div className="relative top-0 h-[1px] w-1/2 ml-24 bg-gradient-to-r from-[#00000000] via-[#00CBF7] to-[#00000000]"></div>
        </div>
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
    </>
  );
}

{/* <div className="border border-solid border-white text-center rounded-2xl relative
before:absolute before:h-[0rem] before:w-[50%] before:-translate-x-1/2 
before:rounded-full before:bg-gradient-to-tr before:from-white before:to-transparent before:-translate-y-[-120px] after:-translate-y-[-120px] before:-translate-x-[-10px] after:-translate-x-[-5px]
before:blur-2xl before:content-[''] 
after:absolute after:-z-20 after:h-[7.5rem] after:w-[50%] after:translate-x-1/3 
after:bg-gradient-to-tr after:from-teal-200 after:via-teal-100 after:blur-2xl after:content-[''] 
before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-teal-900 
before:dark:opacity-20 after:dark:from-teal-400 after:dark:via-[#1FC4DA] after:dark:opacity-30 
sm:before:w-[50%] sm:after:w-[50%] before:lg:h-[90rem]
">
          <Image src="/4.png" height={100} width={400} alt="4" className="rounded-3xl" />
          <div className=" text-center m-4">
            <p className="font-bold text-cyan-500 text-2xl">Dapp store creation</p>
            <p className="mt-4">
              Unlock the power of blockchain technology by learning to build your own Decentralized Application DApp store.
            </p>
          </div>
          </div> */}