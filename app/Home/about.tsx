"use client";

import { zenDotFont } from "@/app/lib/fonts";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// Define a reusable Card component
interface CardProps {
  image: string;
  title: string;
  content: string[];
  className: string;
  priority: number;
  cardNo: number;
}

interface CardComponentProps extends CardProps {
  hoveredCard: number | null;
  setHoveredCard: (index: number | null) => void;
}

export function About(): JSX.Element {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Data for the cards (Ecosystem content)
  const cardData: CardProps[] = [
    {
      image: '/image 76.svg',
      title: "Buy and HODL BTC",
      content: [
        "Get and store Bitcoin in SwapSo hardware wallet.",
        "MFA powered 2-sig self-custody wallet for enhanced security.",
      ],
      className: "bg-gradient-to-r from-[#FFD700] to-[#FFD000]", // Cyan gradient
      priority: -1,
      cardNo: 1,
    },
    {
      image: '/image 83.svg',
      title: "BTC-based Fiat Loans",
      content: [
        "Stake your Bitcoin to SwapSo.",
        "Take easy fiat loans in just a few clicks.",
      ],
      className: "bg-gradient-to-r from-[#FFD700] to-[#FFD000]", // Cyan gradient
      priority: 0,
      cardNo: 2,
    },
    {
      image: '/image 84.svg',
      title: "BTC Finance with RWA",
      content: [
        "Buy Bitcoin through financing based on your real-world asset collaterals.",
        "Flexible repayment options available.",
      ],
      className: "bg-gradient-to-r from-[#FFD700] to-[#FFD000]", // Cyan gradient
      priority: 1,
      cardNo: 3,
    },
  ];

  return (
    <section className="w-full h-fit flex items-center justify-center">
      <div className="wrapper relative w-full h-fit flex items-center justify-center space-x-4 p-8 overflow-x-hidden">
        <div className="sm:flex hidden card-holder relative w-[10rem] h-[16rem] sm:w-[18rem] sm:h-[19rem] md:w-[20rem] md:h-96 shadow-lg shadow-[#FFD700]">
          {/* Map over the cardData to generate each card */}
          {cardData.map((card, index) => (
            <Card
              key={index}
              priority={card.priority}
              image={card.image}
              title={card.title}
              content={card.content}
              className={card.className}
              cardNo={card.cardNo}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </div>
        <div className="card-swipper-full sm:hidden shadow-[#FFD700]">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {cardData.map((card, index) => (
              <SwiperSlide key={index} className="w-[200px] h-[200px]">
                <div className="card w-[270px] h-[350px] flex items-center border-8 border-white rounded-md">
                  <div
                    className={`rounded-lg w-full h-full ${card.className} text-black flex flex-col sm:gap-1 gap-6 items-center py-6 px-5 backdrop-blur-lg shadow-lg shadow-gold`} // Added backdrop-blur and shadow
                  >
                    <Image src={`${card.image}`} width={200} height={200} alt="hero section image" />
                    <h2
                      className={`text-2xl font-semibold ${zenDotFont.className} rounded-sm text-center w-full`}
                    >
                      {card.title}
                    </h2>
                    <ul className="list-disc list-inside space-y-2 w-full">
                      {card.content.map((item, index) => (
                        <li
                          key={index}
                          className={`${zenDotFont.className} text-sm`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

function Card({
  priority,
  image,
  title,
  content,
  className,
  cardNo,
  hoveredCard,
  setHoveredCard,
}: CardComponentProps): JSX.Element {
  const [actualPriority, setActualPriority] = useState(priority);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [hoverStartTimeout, setHoverStartTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hoverEndTimeout, setHoverEndTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (cardNo === 2 && hoveredCard !== null) {
      setActualPriority(hoveredCard === 1 ? -1 : 1);
    }
    if (cardNo === 2 && hoveredCard == null) {
      setActualPriority(0);
    }
  }, [hoveredCard, cardNo]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      whileInView={{
        x: actualPriority * (isSmallScreen ? 160 : 200),
        y: actualPriority === 0 ? -40 : 0,
      }}
      animate={{
        zIndex: actualPriority === 0 ? 20 : 10,
      }}
      onHoverStart={() => {
        if (hoverEndTimeout) {
          clearTimeout(hoverEndTimeout);
        }

        const timeoutId = setTimeout(() => {
          if (cardNo !== 2) {
            setHoveredCard(cardNo);
          }
          setActualPriority(0);
        }, 300);

        setHoverStartTimeout(timeoutId);
      }}
      onHoverEnd={() => {
        if (hoverStartTimeout) {
          clearTimeout(hoverStartTimeout);
        }

        const timeoutId = setTimeout(() => {
          setHoveredCard(null);
          setActualPriority(priority);
        }, 300);

        setHoverEndTimeout(timeoutId);
      }}
      className={`card-wrapper hidden sm:flex absolute rounded-xl border-8 border-white shadow-lg mt-4 ${cardNo === 2 ? "select-none pointer-events-none" : ""}`}
      style={{
        width: isSmallScreen ? '200px' : '320px',
        height: isSmallScreen ? '300px' : '400px',
      }}
    >
      <div
        className={`rounded-lg w-full h-full ${className} text-black flex flex-col gap-4 items-center backdrop-blur-lg shadow-lg shadow-gold`}
      >
        <Image src={`${image}`} width={200} height={200} alt="hero section image" />
        <h2 className={`text-lg font-semibold mb-4 text-center ${zenDotFont.className}`}>
          {title}
        </h2>
        <ul className="list-disc list-inside space-y-2 w-full">
          {content.map((item, index) => (
            <li key={index} className={`text-xs sm:text-sm ${zenDotFont.className}`}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
