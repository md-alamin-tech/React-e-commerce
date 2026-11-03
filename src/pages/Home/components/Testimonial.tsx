/**
 * Testimonial
 * Centered quote with three avatar buttons that switch between customer reviews.
 *
 * Used in: Home page
 */

import React, { useState } from 'react';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Piter Bauman',
    role: 'Business CEO & Co-Founder',
    quote:
      "Thank You For Dinner Last Night. It Was Amazing!! I Have Say It's The Best Meal I Have Had In Quite Some Time. Will Definitely Be Seeing More Eating Next Year.",
  },
  {
    name: 'Arben K.',
    role: 'Verified Buyer',
    quote:
      'Tastes identical to the ajvar my grandmother prepared in Korça every autumn! Thick, smoky, and absolutely delicious.',
  },
  {
    name: 'Elena Rossi',
    role: 'Verified Buyer',
    quote: 'Spread on warm sourdough with feta cheese is heaven. Ordered 4 more jars.',
  },
];

const AVATAR_COLORS = ['bg-brand', 'bg-leaf', 'bg-sun'];

export const Testimonial: React.FC = () => {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Quote size={42} className="text-brand mx-auto mb-5" />
        <h3 className="font-serif text-2xl font-semibold text-ink">{current.name}</h3>
        <p className="font-serif text-sm uppercase tracking-wider text-leaf mt-1">{current.role}</p>
        <p className="font-serif text-xl sm:text-2xl leading-relaxed text-ink/80 mt-6 min-h-[8.5rem]">
          “{current.quote}”
        </p>

        <div className="flex items-center justify-center gap-4 mt-8">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show review from ${t.name}`}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-serif text-xl font-bold transition-all cursor-pointer ${
                AVATAR_COLORS[i % AVATAR_COLORS.length]
              } ${
                i === active
                  ? 'ring-4 ring-offset-4 ring-offset-cream ring-brand/40 scale-110'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              {t.name.charAt(0)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
