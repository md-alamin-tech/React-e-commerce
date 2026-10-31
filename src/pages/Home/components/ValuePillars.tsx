/**
 * ValuePillars
 * Four-column value proposition bar highlighting core brand promises.
 *
 * Used in: Home page
 */

import React from 'react';
import { Leaf, Heart, Users, Award } from 'lucide-react';

export const ValuePillars: React.FC = () => {
  const pillars = [
    {
      icon: <Leaf className="w-5 h-5 text-[#D4AF37]" />,
      title: 'EUROPEAN SPECIALTY FOODS',
      desc: 'Authentic imported & regional culinary delights',
    },
    {
      icon: <Heart className="w-5 h-5 text-[#D4AF37]" />,
      title: 'TRADITIONAL FAVORITES',
      desc: 'Generational recipes from Albania & the Balkans',
    },
    {
      icon: <Users className="w-5 h-5 text-[#D4AF37]" />,
      title: 'LOCAL COMMUNITY',
      desc: 'Proudly family owned & welcoming everyone',
    },
    {
      icon: <Award className="w-5 h-5 text-[#D4AF37]" />,
      title: 'QUALITY YOU CAN TRUST',
      desc: 'Strict freshness, artisanal quality & care',
    },
  ];

  return (
    <section className="p-5 bg-[#0B0710]">
      <div className="rounded-3xl bg-[#120A1D] py-10 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-[#1E1430] flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F5ECD7] mb-1">
                {item.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#B0A99C] max-w-[200px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
