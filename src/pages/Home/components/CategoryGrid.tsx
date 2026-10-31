/**
 * CategoryGrid
 * 8-category visual grid matching Section 1 of the layout mockup.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../../data/categories';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="bg-[#FAF7F2] py-14 lg:py-20 border-b border-[#E8DAC5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with decorative leaf icon */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-[#B88847]/40" />
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#263620] tracking-wide uppercase">
              SHOP BY CATEGORY
            </h2>
            <span className="text-lg">🌿</span>
            <span className="h-[1px] w-8 bg-[#B88847]/40" />
          </div>
          <p className="text-xs sm:text-sm text-[#7C776E] max-w-md mx-auto">
            From creamy brined feta and aged sheep cheeses to golden baklava and hearth-baked burek.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group flex flex-col bg-white rounded-2xl border border-[#EBE5D8] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <Link to={`/shop?category=${cat.slug}`} className="block relative aspect-4/3 overflow-hidden bg-[#F4EFE6]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>
              <div className="p-4 flex flex-col items-center text-center">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#263620] mb-3 group-hover:text-[#B88847] transition-colors">
                  {cat.name}
                </h3>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#263620] hover:bg-[#1C2916] text-white text-[11px] font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>EXPLORE</span>
                  <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
