"use client";
import Image from "next/image";
import { zenDotFont } from "@/app/lib/fonts";
import { useState } from "react";

interface Slide {
  image: string;
  title: string;
  content: string[];
}

const slides: Slide[] = [
  {
    image: 'image 76.svg',
    title: "Buy and HODL BTC",
    content: [
      "Get and store Bitcoin in SwapSo hardware wallet.",
      "MFA powered 2-sig self-custody wallet for enhanced security.",
    ],
  },
  {
    image: 'image 83.svg',
    title: "BTC-based Fiat Loans",
    content: [
      "Stake your Bitcoin to SwapSo.",
      "Take easy fiat loans in just a few clicks.",
    ],
  },
  {
    image: 'image 84.svg',
    title: "BTC Finance with RWA",
    content: [
      "Buy Bitcoin through financing based on your real-world asset collaterals.",
      "Flexible repayment options available.",
    ],
  },
];

export function About2() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    } else if (direction === "right") {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    const startX = touch.clientX;

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const diffX = startX - touch.clientX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          handleSwipe("right");
        } else {
          handleSwipe("left");
        }
      }

      document.removeEventListener("touchmove", handleTouchMove);
    };

    document.addEventListener("touchmove", handleTouchMove);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
      <div
        className="relative w-[300px] h-[450px] overflow-hidden border-4 border-white rounded-lg shadow-lg bg-[#FFD700]"
        onTouchStart={handleTouchStart}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } ${zenDotFont.className} w-full h-full flex flex-col items-center justify-center p-4 bg-[#FFD700] rounded-lg`}
          >
            <Image src={`${slide.image}`} width={250} height={100} alt="about us images" />
            <h2 className={`${zenDotFont.className} text-xl font-bold text-center text-[#333]`}>{slide.title}</h2>
            <ul className="list-disc list-inside text-left space-y-2">
              {slide.content.map((item, itemIndex) => (
                <li key={itemIndex} className="text-md text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-[#FFD700]" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
