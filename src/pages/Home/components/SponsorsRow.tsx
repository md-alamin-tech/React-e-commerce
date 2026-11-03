/**
 * SponsorsRow
 * "Happy sponsors" strip with grayscale wordmarks that colour up on hover.
 * Wordmarks are text placeholders until real partner logos are supplied.
 *
 * Used in: Home page
 */

import React from 'react';

const SPONSORS = [
  { name: 'ORANGE', cls: 'font-serif font-bold tracking-widest text-2xl' },
  { name: 'Delicious', cls: 'font-hand text-3xl' },
  { name: 'CHICKEN', cls: 'font-serif font-semibold tracking-[0.3em] text-xl' },
  { name: 'Pizza Hub', cls: 'font-serif font-bold italic text-2xl' },
  { name: 'COOK HOUSE', cls: 'font-serif font-medium tracking-widest text-xl' },
  { name: 'Fresh&Co', cls: 'font-hand text-3xl' },
];

export const SponsorsRow: React.FC = () => (
  <section className="bg-cream pb-14 lg:pb-16">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
      <div className="flex items-center gap-5 mb-8">
        <span className="h-px flex-1 bg-black/10" />
        <p className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-ink">
          <span className="text-brand">20</span> Happy Sponsors With Us
        </p>
        <span className="h-px flex-1 bg-black/10" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
        {SPONSORS.map((s) => (
          <span
            key={s.name}
            className={`${s.cls} text-ink/40 hover:text-brand transition-colors cursor-default select-none`}
          >
            {s.name}
          </span>
        ))}
      </div>
    </div>
  </section>
);
