import React from "react";
import Link from "next/link";

const BitcoinCardButton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-transparent p-1">
      <div className="flex mx-auto w-[240px] md:w-[290px] h-[44px] md:h-[52px] bg-[#121212] rounded-[14px] border border-gray-700/50">

        {/* Bitcoin Card Text */}
        <div className="flex-1 flex items-center justify-start pl-6 md:pl-8">
          <Link href='https://superprofile.bio/vp/6791da516e64b60013302c99'>
            <button className="text-white text-[16px] md:text-[18px] font-medium tracking-wide">
              Bitcoin Card
            </button>
          </Link>
        </div>

        <div className="w-[1px] h-[60%] my-auto bg-gray-600/50" />
        
        <Link href='https://superprofile.bio/vp/6791e8bd1ca4f90013d493f9'>
          <button
            onClick={() => console.log("Order clicked")}
            className="h-full px-4 md:px-8 rounded-r-[14px] bg-gradient-to-r from-[#0077B8] to-[#01D2FC] text-white text-[14px] md:text-base font-medium tracking-wide transition-all hover:brightness-110"
          >
            Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BitcoinCardButton;
