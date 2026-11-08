/**
 * PageBanner
 * Shared page banner, same look as the home hero: full-width photo with a dark
 * overlay, white condensed heading and optional content (buttons, forms) below.
 *
 * @param {string} title - h1 text
 * @param {string} subtitle - optional supporting paragraph
 * @param {string} image - background image path
 * @param {'left' | 'center'} align - content alignment
 * @param {React.ReactNode} children - extra content under the subtitle
 *
 * Used in: Shop, Recipes, About, Contact, ComingSoon
 */

import React from 'react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  align?: 'left' | 'center';
  children?: React.ReactNode;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  image,
  imageAlt = '',
  align = 'center',
  children,
}) => {
  const center = align === 'center';

  return (
    <section className="relative isolate overflow-hidden bg-[#0d0d0d] min-h-[340px] lg:min-h-[420px] flex items-center">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 -z-20 w-full h-full object-cover object-center"
      />
      <div
        className={`absolute inset-0 -z-10 pointer-events-none ${
          center
            ? 'bg-black/65'
            : 'bg-gradient-to-r from-black/90 via-black/70 to-black/40'
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 h-24 -z-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div
          className={
            center
              ? 'max-w-3xl mx-auto text-center flex flex-col items-center'
              : 'max-w-2xl text-left flex flex-col items-start'
          }
        >
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-white leading-[1.1] mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
          {children && (
            <div className={`mt-8 w-full ${center ? 'flex justify-center' : ''}`}>{children}</div>
          )}
        </div>
      </div>
    </section>
  );
};
