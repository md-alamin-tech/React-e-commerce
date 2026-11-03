/**
 * SectionTitle
 * Green kicker line plus large condensed heading used by every home section.
 *
 * @param {string} label - small green text above the title
 * @param {string} title - main heading
 * @param {boolean} center - center align (default true)
 * @param {boolean} light - white heading for dark backgrounds
 */

import React from 'react';

interface SectionTitleProps {
  label?: string;
  title: React.ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  label = 'Crispy, Every Bite Taste',
  title,
  center = true,
  light = false,
  className = '',
}) => (
  <div className={`${center ? 'text-center' : 'text-left'} ${className}`}>
    <p className="font-serif text-base sm:text-lg font-semibold text-leaf tracking-wide">{label}</p>
    <h2
      className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mt-1 ${
        light ? 'text-white' : 'text-ink'
      }`}
    >
      {title}
    </h2>
  </div>
);
