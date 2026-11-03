/**
 * DishesMarquee
 * Endless outlined "Populer Dishes" ticker with small food icons between repeats.
 *
 * Used in: Home page
 */

import React from 'react';
import { Pizza, Sandwich, Beef } from 'lucide-react';

const ICONS = [Sandwich, Pizza, Beef];

export const DishesMarquee: React.FC = () => {
  // Two identical halves so translateX(-50%) loops seamlessly
  const half = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="bg-cream overflow-hidden py-8 select-none" aria-hidden="true">
      <div className="flex w-max items-center animate-[marquee_35s_linear_infinite]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {half.map((i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={i} className="flex items-center gap-8 pr-8">
                  <span
                    className="font-serif text-7xl sm:text-8xl font-bold whitespace-nowrap"
                    style={{ WebkitTextStroke: '1.5px #e4c9c4', color: 'transparent' }}
                  >
                    Populer Dishes
                  </span>
                  <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Icon size={26} className="text-brand" />
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
