/**
 * CtaBanner
 * Featured photographic banner in the middle/bottom of the products page.
 *
 * Used in: Shop page
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  onExploreAll?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onExploreAll }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden my-12 border border-black/10 shadow-lg">
      <img
        src="/assets/aistudio/EA7AB6BA-A77D-4A0C-868C-F7B2BD7987DF_df31e837.png"
        alt="Traditional culinary feast"
        className="w-full h-56 sm:h-64 object-cover object-center filter brightness-[0.7]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/30">
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white mb-4 tracking-tight drop-shadow-md">
          Traditional Ingredients, Extraordinary Meals.
        </h3>
        <button
          onClick={onExploreAll}
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium tracking-wide uppercase transition-colors shadow-md cursor-pointer h-12 px-8 rounded-full font-serif text-sm justify-center"
        >
          <span>EXPLORE ALL PRODUCTS</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
