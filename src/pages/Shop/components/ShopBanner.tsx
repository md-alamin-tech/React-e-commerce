/**
 * ShopBanner
 * Top header banner matching Section 2 of the mockup.
 *
 * Used in: Shop page
 */

import React from 'react';

export const ShopBanner: React.FC = () => {
  return (
    <div className="bg-[#1A0F2B] text-[#E9DFF7] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#34254D] text-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#B88847_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#D4AF37] block mb-2">
          OUR PRODUCTS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5ECD7] tracking-tight mb-4">
          Authentic Flavors from Near and Far
        </h1>
        <p className="text-xs sm:text-sm text-[#3A2A55] leading-relaxed max-w-xl mx-auto">
          Discover our carefully curated selection of European and Balkan groceries, fresh baked goods, and traditional favorites.
        </p>
      </div>
    </div>
  );
};
