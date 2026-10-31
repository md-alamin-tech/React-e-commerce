/**
 * StorySection
 * Narrative brand showcase highlighting heritage, culture, and community roots.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section className="bg-[#120A1D] py-16 lg:py-24 border-b border-[#2E2045] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Scenic Image */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-[#2E2045] aspect-4/3 sm:aspect-16/10">
              <img
                src="/assets/aistudio/F2D2C2FE-6DDF-4915-ACF2-5627FCCF53C8_fd4723d5.png"
                alt="European market shop with regional flags and scenic river bridge"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Soft decorative olive backdrop leaf */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-2">
              OUR STORY
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#B57BFF] tracking-tight mb-2">
              MORE THAN GROCERIES...
            </h2>

            <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#D4AF37] mb-6 leading-tight">
              It's our culture, <br />
              our traditions, <br />
              our memories.
            </p>

            <p className="text-sm sm:text-base text-[#C9BFDD] leading-relaxed mb-8 max-w-lg">
              Belké Market is a European specialty grocery store bringing authentic flavors from Albania and across Europe to our local community. We hand-select high quality imported products that bring back cherished memories around the dinner table.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0B0710] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-xs hover:shadow"
            >
              <span>OUR STORY</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
