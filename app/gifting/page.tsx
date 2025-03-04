'use client';
import React, { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';
import Image from 'next/image';
import FloatingButton from './FloatingButton';
import CustomCursor from '../Home/customCursor';
import Navbar from './navbar1';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  gradient?: boolean;
  gradientClass?: string;
  priority?: boolean;
  enableHoverEffect?: boolean;
}

interface CarouselItem {
  content: React.ReactNode;
}

interface CarouselSectionProps {
  items: CarouselItem[];
  currentSlide: number;
  setCurrentSlide: (value: number | ((prev: number) => number)) => void;
  isAutoPlaying: boolean;
  setIsAutoPlaying: (value: boolean) => void;
  sectionTitle: string;
}

interface NavigationHandlers {
  nextSlide: () => void;
  prevSlide: () => void;
}

// Update MobileImageScroll to remove the indicators
interface MobileImageScrollProps {
  images: React.ReactNode[];
  className?: string;
}

const MobileImageScroll: React.FC<MobileImageScrollProps> = ({ images, className = '' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={scrollRef}
      className={`
        flex overflow-x-auto snap-x snap-mandatory scrollbar-hide
        ${className}
      `}
      style={{ 
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {images.map((image, index) => (
        <div key={index} className="min-w-full flex-shrink-0 snap-center px-4">
          {image}
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  // State declarations remain the same
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    isMobile: false,
    sectionVisibility: {
      newSection: false,
      scrollProgress: 0,
    },
  });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGiftSlide, setCurrentGiftSlide] = useState(0);
  const [currentCardSlide, setCurrentCardSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isGiftAutoPlaying, setIsGiftAutoPlaying] = useState(true);
  const [isCardAutoPlaying, setIsCardAutoPlaying] = useState(true);
  const [activeSection, setActiveSection] = useState('why-bitcoin');
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [columnScrollPositions, setColumnScrollPositions] = useState<number[]>([0, 0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [touchState, setTouchState] = useState({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    moving: false
  });
  const [isScrollingLocked, setIsScrollingLocked] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const scrollCooldown = 1000; // 1 second cooldown between scrolls

  // ImageCard component remains the same
  const ImageCard = ({
    src,
    alt,
    className = '',
    gradient = false,
    gradientClass = '',
    priority = false,
    enableHoverEffect = false,
  }: ImageCardProps) => {
    return (
      <div
        className={`
          relative w-full overflow-hidden 
          transition-all duration-300 ease-in-out
          ${enableHoverEffect && hoveredItem === alt ? 'scale-[1.08] z-10 shadow-2xl' : 'scale-100'}
          ${className}
        `}
        onMouseEnter={enableHoverEffect ? () => setHoveredItem(alt) : undefined}
        onMouseLeave={enableHoverEffect ? () => setHoveredItem(null) : undefined}
      >
        {gradient && (
          <div className={`absolute inset-0 z-10 ${gradientClass}`} />
        )}
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain w-full h-full"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      </div>
    );
  };

  // Reordered carousel items for mobile
  const carouselItems = [
    {
      content: (
        <div className="space-y-8">
          <ImageCard
            src="/features.svg"
            alt="Bitcoin Features"
            className="aspect-[415/390]"
            priority={true}
          />
          <ImageCard
            src="/quote.svg"
            alt="Bitcoin Quote"
            className="aspect-[415/180]"
            gradient={true}
          />
        </div>
      )
    },
    {
      content: (
        <ImageCard
          src="/store-of-value.svg"
          alt="Superior store of value"
          className="aspect-[110/120]"
          gradient={true}
        />
      )
    },
    {
      content: (
        <div className="space-y-8">
          <ImageCard
            src="/asset-class.svg"
            alt="Largest Growing Asset Class"
            className="aspect-[10/4.31]"
          />
          <ImageCard
            src="/market-cap.svg"
            alt="Market Cap"
            className="aspect-[415/390]"
          />
        </div>
      )
    }
  ];

  // Reordered gifting carousel items for mobile
  const giftingCarouselItems = [
    {
      content: (
        <div className="space-y-12">
          <ImageCard
            src="/why-bitcoin.svg"
            alt="Why Bitcoin"
            className="aspect-[415/358]"
            priority
          />
          <ImageCard
            src="/Empower.svg"
            alt="Empower"
            className="aspect-[415/212]"
            gradient={true}
          />
        </div>
      )
    },
    {
      content: (
        <ImageCard
          src="/wealth-transfer.svg"
          alt="Classy Gift"
          className="aspect-[11/12]"
          gradient={true}
        />
      )
    },
    {
      content: (
        <ImageCard
          src="/classy-gift.svg"
          alt="Classy Gift"
          className="aspect-[415/600]"
          gradient={true}
        />
      )
    }
  ];

  // Reordered card carousel items for mobile
  const cardCarouselItems = [
    {
      content: (
        <ImageCard
          src="/three-center.svg"
          alt="Classy Gift"
          className="aspect-[460/600]"
          gradient={true}
        />
      )
    },
    {
      content: (
        <ImageCard
          src="/three-left.svg"
          alt="Why Bitcoin"
          className="aspect-[460/600]"
          priority
        />
      )
    },
    {
      content: (
        <ImageCard
          src="/three-right.svg"
          alt="Classy Gift"
          className="aspect-[460/600]"
          gradient={true}
        />
      )
    }
  ];

  const createNavigationHandlers = (
    currentSlide: number,
    setCurrentSlide: (value: number | ((prev: number) => number)) => void,
    totalSlides: number,
    setAutoPlaying: (value: boolean) => void
  ): NavigationHandlers => {
    const nextSlide = () => {
      setCurrentSlide((prev: number) => (prev + 1) % totalSlides);
      setAutoPlaying(false);
      setTimeout(() => setAutoPlaying(true), 5000);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev: number) => (prev - 1 + totalSlides) % totalSlides);
      setAutoPlaying(false);
      setTimeout(() => setAutoPlaying(true), 5000);
    };

    // Closing bracket for createNavigationHandlers
    return { nextSlide, prevSlide };
  };
  
  // Carousel Component
  const CarouselSection: React.FC<CarouselSectionProps> = ({ 
    items, 
    currentSlide, 
    setCurrentSlide, 
    isAutoPlaying, 
    setIsAutoPlaying, 
    sectionTitle 
  }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(currentSlide);

    // Simplified scroll handler
    const scrollToIndex = (index: number) => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const width = container.offsetWidth;
      
      container.scrollTo({
        left: index * width,
        behavior: 'smooth'
      });
      
      setActiveIndex(index);
      setCurrentSlide(index);
    };

    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const width = container.offsetWidth;
      const newIndex = Math.round(scrollPosition / width);
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        setCurrentSlide(newIndex);
      }
    };

    useEffect(() => {
      const container = scrollContainerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }
    }, []);

    return (
      <div className="relative w-full h-full px-2 md:px-4">
        {/* Desktop navigation buttons */}
        {!scrollState.isMobile && (
          <>
            <button
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-r-lg"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => scrollToIndex(Math.min(items.length - 1, activeIndex + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-l-lg"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Carousel container */}
        <div 
          ref={scrollContainerRef}
          className="w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="flex h-full">
            {items.map((item, index) => (
              <div 
                key={index}
                className="min-w-full flex-shrink-0 h-full snap-center"
              >
                <div className="w-full h-full px-2 md:px-0">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Rest of the component logic (useEffect, scroll handlers, etc.) remains the same
  const sections = [
    { id: 'why-bitcoin', title: 'Why Bitcoin' },
    { id: 'why-gift-bitcoin', title: 'Why Gift Bitcoin?' },
    { id: 'why-use-card', title: 'Why Use Bitcoin Card?' }
  ];

  // Modify scrollToSection to work with the new page system
  const scrollToSection = useCallback((sectionId: string) => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId);
    if (sectionIndex !== -1 && !isScrollingLocked) {
      setIsScrollingLocked(true);
      setCurrentSection(sectionIndex);
      setActiveSection(sectionId);
      
      setTimeout(() => {
        setIsScrollingLocked(false);
      }, 1000);
    }
  }, [sections, isScrollingLocked]);

  const handleScroll = useCallback(() => {
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = window.scrollY / pageHeight;

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveSection(id);
        }
      }
    });

    setScrollState((prev) => ({
      ...prev,
      scrollY: window.scrollY,
      sectionVisibility: {
        newSection: scrollProgress > 0.2,
        scrollProgress: Math.min(scrollProgress, 1),
      },
    }));
  }, []);

  const checkMobile = useCallback(() => {
    setScrollState((prev) => ({
      ...prev,
      isMobile: window.innerWidth < 768,
    }));
  }, []);

  // Add vertical scroll handler for mobile
  const handleVerticalScroll = useCallback(() => {
    if (!scrollState.isMobile) return;
    
    const sections = document.querySelectorAll('.section');
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight / 2;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (Math.abs(rect.top) < threshold) {
        setCurrentSection(index);
        setActiveSection(sections[index].id);
      }
    });
  }, [scrollState.isMobile]);

  // Add this new function before the return statement
  const handleMobileScroll = useCallback((e: Event) => {
    if (!scrollState.isMobile) return;
    
    const now = Date.now();
    if (now - lastScrollTime < scrollCooldown) {
      return;
    }
  
    const sections = document.querySelectorAll('.section');
    const currentSectionElement = sections[currentSection];
    if (!currentSectionElement) return;
  
    const rect = currentSectionElement.getBoundingClientRect();
    const scrollDirection = window.scrollY > 0 ? 1 : -1;
  
    if (!isScrolling) {
      setIsScrolling(true);
      setLastScrollTime(now);
  
      // Only allow scrolling to adjacent sections
      const targetSection = currentSection + scrollDirection;
      if (targetSection >= 0 && targetSection < sections.length) {
        sections[targetSection].scrollIntoView({ behavior: 'smooth' });
        setCurrentSection(targetSection);
        setActiveSection(sections[targetSection].id);
      }
  
      setTimeout(() => {
        setIsScrolling(false);
      }, scrollCooldown);
    }
  
    e.preventDefault();
  }, [currentSection, isScrolling, lastScrollTime, scrollState.isMobile]);

  // Add this useEffect for vertical scroll
  useEffect(() => {
    if (scrollState.isMobile) {
      window.addEventListener('scroll', handleVerticalScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleVerticalScroll);
    }
  }, [handleVerticalScroll, scrollState.isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [handleScroll, checkMobile]);

  // Auto-play intervals
  useInterval(() => {
    if (isAutoPlaying && !scrollState.isMobile) {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }
  }, scrollState.isMobile ? null : 3000);

  useInterval(() => {
    if (isGiftAutoPlaying && !scrollState.isMobile) {
      setCurrentGiftSlide((prev) => (prev + 1) % giftingCarouselItems.length);
    }
  }, scrollState.isMobile ? null : 3000);

  useInterval(() => {
    if (isCardAutoPlaying && !scrollState.isMobile) {
      setCurrentCardSlide((prev) => (prev + 1) % cardCarouselItems.length);
    }
  }, scrollState.isMobile ? null : 3000);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentSection]);

  // Update useEffect for section tracking
  useEffect(() => {
    // Update active section whenever currentSection changes
    setActiveSection(sections[currentSection].id);
  }, [currentSection]);

  // Add missing wheel handler
  const handleWheel = useCallback((e: WheelEvent) => {
    if (scrollState.isMobile || isScrollingLocked) return;
    
    e.preventDefault();
    
    // Force to next/previous section based on scroll direction
    if (Math.abs(e.deltaY) > 5) { // Small threshold to prevent accidental triggers
      const direction = e.deltaY > 0 ? 1 : -1;
      const newSection = currentSection + direction;
      
      if (newSection >= 0 && newSection < sections.length) {
        setIsScrollingLocked(true);
        setCurrentSection(newSection);
        setActiveSection(sections[newSection].id);
        
        setTimeout(() => {
          setIsScrollingLocked(false);
        }, 1000);
      }
    }
  }, [currentSection, sections.length, scrollState.isMobile, isScrollingLocked]);

  // Add touch handlers for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isScrollingLocked) return;
    
    const touchDelta = touchStartY - e.touches[0].clientY;
    const minSwipeDistance = 50; // Minimum distance for swipe to trigger

    if (Math.abs(touchDelta) > minSwipeDistance) {
      const direction = touchDelta > 0 ? 1 : -1;
      const newSection = currentSection + direction;

      if (newSection >= 0 && newSection < sections.length) {
        setIsScrollingLocked(true);
        setCurrentSection(newSection);
        setActiveSection(sections[newSection].id);

        setTimeout(() => {
          setIsScrollingLocked(false);
        }, 1000);
      }
      setTouchStartY(e.touches[0].clientY);
    }
  }, [currentSection, sections.length, touchStartY, isScrollingLocked]);

  // Update useEffect for event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart as any, { passive: true });
      container.addEventListener('touchmove', handleTouchMove as any, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart as any);
        container.removeEventListener('touchmove', handleTouchMove as any);
      }
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  // Update the mobile container styles in the return statement
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white relative">
      {/* Only show CustomCursor on desktop */}
      {!scrollState.isMobile && <CustomCursor />}
      
      {/* Fixed Navbar - Adjusted z-index and positioning */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black h-[60px]">
        <Navbar
          isMobile={scrollState.isMobile}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />
      </div>

      <div 
        ref={containerRef}
        className={`
          min-h-screen
          transition-transform duration-1000 ease-in-out
          ${scrollState.isMobile ? 'pt-[40px] overflow-y-auto snap-y snap-mandatory scroll-smooth' : 'pt-[80px] flex flex-row'}
        `}
        style={{ 
          transform: scrollState.isMobile 
            ? 'none'
            : `translateX(-${currentSection * 100}%)`,
          height: '100vh',
          willChange: 'transform',
          overscrollBehavior: scrollState.isMobile ? 'contain' : 'auto',
        }}
        onWheel={!scrollState.isMobile ? handleWheel as any : undefined}
      >
        {/* Section 1: Why Bitcoin */}
        <div 
          id="why-bitcoin"
          className={`
            section relative box-border
            ${scrollState.isMobile ? 'min-h-screen snap-start pt-6' : 'min-w-full'} 
            flex-shrink-0 px-4 md:px-24
          `}
        >
          <div className="container mx-auto max-w-[2400px] h-full pt-8">
            {scrollState.isMobile ? (
              <h2 className="text-3xl font-bold text-center text-white mt-4 mb-6">
                Why Bitcoin
              </h2>
            ) : (
              <div className="h-24" /> /* Desktop margin replacement */
            )}
            <div className="h-full">
              {scrollState.isMobile ? (
                <div className="flex flex-col">
                  <MobileImageScroll
                    images={[
                      <div key="column1" className="space-y-8">
                        <ImageCard
                          src="/features.svg"
                          alt="Bitcoin Features"
                          className="aspect-[415/390]"
                          priority={true}
                        />
                        <ImageCard
                          src="/quote.svg"
                          alt="Bitcoin Quote"
                          className="aspect-[415/180]"
                          gradient={true}
                        />
                      </div>,
                      <ImageCard
                        key="store"
                        src="/store-of-value.svg"
                        alt="Superior store of value"
                        className="aspect-[110/120]"
                        gradient={true}
                      />,
                      <div key="column3" className="space-y-8">
                        <ImageCard
                          src="/asset-class.svg"
                          alt="Largest Growing Asset Class"
                          className="aspect-[10/4.31]"
                        />
                        <ImageCard
                          src="/market-cap.svg"
                          alt="Market Cap"
                          className="aspect-[415/390]"
                        />
                      </div>
                    ]}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1fr] gap-8 md:gap-4">
                  {/* Left Column */}
                  <div className="space-y-8">
                    <ImageCard
                      src="/features.svg"
                      alt="Bitcoin Features"
                      className="aspect-[415/390]"
                      priority
                    />
                    <ImageCard
                      src="/quote.svg"
                      alt="Bitcoin Quote"
                      className="aspect-[415/180]"
                      gradient={true}
                    />
                  </div>

                  {/* Center Column */}
                  <div className="md:px-4">
                    <ImageCard
                      src="/store-of-value.svg"
                      alt="Superior store of value"
                      className="aspect-[110/120]"
                      gradient={true}
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    <ImageCard
                      src="/asset-class.svg"
                      alt="Largest Growing Asset Class"
                      className="aspect-[10/4.31]"
                    />
                    <ImageCard
                      src="/market-cap.svg"
                      alt="Market Cap"
                      className="aspect-[415/390]"

                    />
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1fr] gap-8 md:gap-12">
                    {/* Left Column */}
                    <div className="space-y-8">
                      <ImageCard
                        src="/features.svg"
                        alt="Bitcoin Features"
                        className="aspect-[415/390]"
                        priority
                      />
                      <ImageCard
                        src="/quote.svg"
                        alt="Bitcoin Quote"
                        className="aspect-[415/180]"
                        gradient={true}
                      />
                    </div>

                    {/* Center Column */}
                    <div className="md:px-4">
                      <ImageCard
                        src="/store-of-value.svg"
                        alt="Superior store of value"
                        className="aspect-[110/120]"
                        gradient={true}
                      />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                      <ImageCard
                        src="/asset-class.svg"
                        alt="Largest Growing Asset Class"
                        className="aspect-[10/4.31]"
                      />
                      <ImageCard
                        src="/market-cap.svg"
                        alt="Market Cap"
                        className="aspect-[415/390]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Why Gift Bitcoin */}

        <div 
          id="why-gift-bitcoin"
          className={`
            section relative box-border
            ${scrollState.isMobile ? 'min-h-screen snap-start pt-10' : 'min-w-full'} 
            flex-shrink-0 px-4 md:px-24
          `}
        >
          <div className="container mx-auto max-w-[2400px] h-full">
            {scrollState.isMobile ? (
              <h2 className="text-3xl font-bold text-center text-white py-8">
                Why Gift Bitcoin?
              </h2>
            ) : (
              <div className="h-24" /> /* Desktop margin replacement */
            )}
            <div className="h-full">
              {scrollState.isMobile ? (
                <div className="flex flex-col">
                  <MobileImageScroll
                    images={[
                      <div key="column1" className="space-y-8">
                        <ImageCard
                          src="/why-bitcoin.svg"
                          alt="Why Bitcoin"
                          className="aspect-[415/358]"
                          priority
                        />
                        <ImageCard
                          src="/Empower.svg"
                          alt="Empower"
                          className="aspect-[415/212]"
                          gradient={true}
                        />
                      </div>,
                      <ImageCard
                        key="wealth"
                        src="/wealth-transfer.svg"
                        alt="Classy Gift"
                        className="aspect-[11/12]"
                        gradient={true}
                      />,
                      <ImageCard
                        key="classy"
                        src="/classy-gift.svg"
                        alt="Classy Gift"
                        className="aspect-[415/600]"
                        gradient={true}
                      />
                    ]}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1fr] gap-8 md:gap-4">
                  {/* Desktop layout content */}
                  <div className="md:px-4 order-1 md:order-2">
                    <ImageCard
                      src="/wealth-transfer.svg"
                      alt="Classy Gift"
                      className="aspect-[11/12]"
                      gradient={true}
                    />
                  </div>
                  <div className="space-y-8 order-2 md:order-1">
                    <ImageCard
                      src="/why-bitcoin.svg"
                      alt="Why Bitcoin"
                      className="aspect-[415/358]"
                      priority
                    />
                    <ImageCard
                      src="/Empower.svg"
                      alt="Empower"
                      className="aspect-[415/212]"
                      gradient={true}

                    />
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1fr] gap-8 md:gap-12">
                    {/* Desktop layout content */}
                    <div className="md:px-4 order-1 md:order-2">
                      <ImageCard
                        src="/wealth-transfer.svg"
                        alt="Classy Gift"
                        className="aspect-[11/12]"
                        gradient={true}
                      />
                    </div>
                    <div className="space-y-6 order-2 md:order-1">
                      <ImageCard
                        src="/why-bitcoin.svg"
                        alt="Why Bitcoin"
                        className="aspect-[415/358]"
                        priority
                      />
                      <ImageCard
                        src="/Empower.svg"
                        alt="Empower"
                        className="aspect-[415/212]"
                        gradient={true}
                      />
                    </div>
                    <div className="order-3">
                      <ImageCard
                        src="/classy-gift.svg"
                        alt="Classy Gift"
                        className="aspect-[415/600]"
                        gradient={true}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Why Use Bitcoin Card */}

        <div 
          id="why-use-card"
          className={`
            section relative box-border
            ${scrollState.isMobile ? 'min-h-screen snap-start pt-10' : 'min-w-full'} 
            flex-shrink-0 px-4 md:px-24
          `}
        >
          <div className="container mx-auto max-w-[2400px] h-full">
            {scrollState.isMobile ? (
              <h2 className="text-3xl font-bold text-center text-white py-8">
                Why Use Bitcoin Card?
              </h2>
            ) : (
              <div className="h-24" /> /* Desktop margin replacement */
            )}
            <div className="h-full">
              {scrollState.isMobile ? (
                <div className="flex flex-col">
                  <MobileImageScroll
                    images={[
                      <ImageCard
                        key="center"
                        src="/three-center.svg"
                        alt="Classy Gift"
                        className="aspect-[460/600]"
                        gradient={true}
                      />,
                      <ImageCard
                        key="left"
                        src="/three-left.svg"
                        alt="Why Bitcoin"
                        className="aspect-[460/600]"
                        priority
                      />,
                      <ImageCard
                        key="right"
                        src="/three-right.svg"
                        alt="Classy Gift"
                        className="aspect-[460/600]"
                        gradient={true}
                      />
                    ]}
                    className="mb-8"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                  <div className="order-2 md:order-1">
                    <ImageCard
                      src="/three-left.svg"
                      alt="Why Bitcoin"
                      className="aspect-[460/600]"
                      priority

                    />
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
                    <div className="order-2 md:order-1">
                      <ImageCard
                        src="/three-left.svg"
                        alt="Why Bitcoin"
                        className="aspect-[460/600]"
                        priority
                      />
                    </div>
                    <div className="order-1 md:order-2">
                      <ImageCard
                        src="/three-center.svg"
                        alt="Classy Gift"
                        className="aspect-[460/600]"
                        gradient={true}
                      />
                    </div>
                    <div className="order-3">
                      <ImageCard
                        src="/three-right.svg"
                        alt="Classy Gift"
                        className="aspect-[460/600]"
                        gradient={true}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <FloatingButton />
      </div>
    </div>
  );
};

export default Home;