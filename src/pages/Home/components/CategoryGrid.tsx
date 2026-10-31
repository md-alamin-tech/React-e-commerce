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
    <section className="bg-[#0B0710] py-14 lg:py-20">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with decorative leaf icon */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5ECD7] tracking-wide uppercase">
              SHOP BY CATEGORY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#B0A99C] max-w-md mx-auto">
            From creamy brined feta and aged sheep cheeses to golden baklava and hearth-baked burek.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group flex flex-col bg-[#140C1F] rounded-2xl border border-[#2A1D3F] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <Link to={`/shop?category=${cat.slug}`} className="block relative aspect-4/3 overflow-hidden bg-[#1B1229]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>
              <div className="p-4 flex flex-col items-center text-center">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#F5ECD7] mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {cat.name}
                </h3>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0B0710] font-semibold tracking-wider uppercase transition-colors h-12 px-8 rounded-full text-xs justify-center"
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
