/**
 * PageBanner
 * Shared page banner: a rounded photo background inside a 20px frame (same as the
 * home hero). The site header floats over its top edge.
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
    <section className="p-5 bg-[#0B0710]">
      <div className="relative overflow-hidden isolate rounded-[14px] min-h-[420px] lg:min-h-[480px] flex items-center">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 -z-20 w-full h-full object-cover object-center"
        />
        <div
          className={`absolute inset-0 -z-10 pointer-events-none ${
            center
              ? 'bg-[#0B0710]/60'
              : 'bg-gradient-to-r from-[#0B0710]/85 via-[#0B0710]/55 to-[#0B0710]/15'
          }`}
        />
        <div className="absolute inset-x-0 top-0 h-40 -z-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-14 lg:pb-16">
          <div
            className={
              center
                ? 'max-w-3xl mx-auto text-center flex flex-col items-center'
                : 'max-w-2xl text-left flex flex-col items-start'
            }
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5ECD7] tracking-tight leading-[1.15] mb-4">
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
      </div>
    </section>
  );
};
