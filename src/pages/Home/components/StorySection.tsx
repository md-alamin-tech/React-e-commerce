/**
 * StorySection
 * Narrative brand showcase highlighting heritage, culture, and community roots.
 * The scenic photo is the section background inside a 20px frame, like the hero.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section className="p-5 bg-[#0B0710]">
      <div className="relative overflow-hidden isolate rounded-3xl min-h-[560px] lg:min-h-[640px] flex items-center">
        <img
          src="/assets/aistudio/F2D2C2FE-6DDF-4915-ACF2-5627FCCF53C8_fd4723d5.png"
          alt="European market shop with regional flags and scenic river bridge"
          className="absolute inset-0 -z-20 w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B0710]/85 via-[#0B0710]/55 to-[#0B0710]/15 pointer-events-none" />

        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-xl flex flex-col items-start text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5ECD7] tracking-tight mb-2">
              MORE THAN GROCERIES...
            </h2>

            <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#D4AF37] mb-6 leading-tight">
              It's our culture, <br />
              our traditions, <br />
              our memories.
            </p>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-8 max-w-lg">
              Belké Market is a European specialty grocery store bringing authentic flavors from Albania and across Europe to our local community. We hand-select high quality imported products that bring back cherished memories around the dinner table.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0B0710] font-semibold tracking-wider uppercase transition-all shadow-xs hover:shadow h-12 px-8 rounded-full text-xs"
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
