'use client'
import React, { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <div 
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="flex flex-row items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2L12 21L14 16L21 12L3 2Z" fill="#06b6d4" />
          </svg>
        </div>

        {/* <div className="flex items-center gap-2 bg-[#0e1116] border border-cyan-400 text-xs px-3 py-1.5 rounded-full shadow-sm shadow-cyan-300 ml-2">
          Swap
        </div> */}
      </div>
    </>
  );
};

export default CustomCursor;
