/**
 * HeroSection
 * Full-bleed landing hero. The feast photography is the section background and
 * sits behind the (transparent) site header. Brand tagline, cursive script
 * typography, dual call-to-actions and core value badges are layered on top.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, HeartHandshake, Award, ShieldCheck } from 'lucide-react';

const VALUE_BADGES = [
  { icon: Award, label: 'QUALITY' },
  { icon: ShieldCheck, label: 'TRADITION' },
  { icon: HeartHandshake, label: 'COMMUNITY' },
  { icon: Sparkles, label: 'AUTHENTIC FLAVORS' },
];

export const HeroSection: React.FC = () => {
  return (
    <section className="p-5 bg-[#0B0710]">
    <div className="relative overflow-hidden isolate rounded-[10px] min-h-[620px] lg:min-h-[720px] flex items-center">
      {/* Background image (sits behind the header) */}
      <img
        src="/assets/aistudio/418DF6A8-A9E9-410B-B7B8-20AFB3597616_6d2f0595.png"
        alt="European and Balkan culinary feast overlooking the historic river bridge"
        className="absolute inset-0 -z-20 w-full h-full object-cover object-center"
      />
      {/* Readability overlays: left-to-right for the copy, top-down for the header */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B0710]/85 via-[#0B0710]/55 to-[#0B0710]/15 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 -z-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      {/* pt-[97px] offsets the floating header so content never hides under it */}
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 pt-[97px] pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          {/* Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#F5ECD7] tracking-tight leading-[1.15] mb-6">
              A LITTLE TASTE <br />
              OF HOME, <br />
              <span className="font-script font-normal text-5xl sm:text-6xl lg:text-7xl text-[#F0D77A] block -mt-2">
                close to home.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-white/85 max-w-md leading-relaxed mb-8">
              Discover artisan cheeses, slow-simmered ajvar, crispy spiral burek, hand-stretched phyllo pastries, and beloved European pantry staples delivered fresh to your table.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E8C547] text-[#0B0710] font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow active:scale-98 h-12 px-8 rounded-full text-xs"
              >
                <span>EXPLORE OUR PRODUCTS</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center border border-white/80 hover:bg-white/10 text-white font-semibold tracking-wider uppercase transition-all active:scale-98 h-12 px-8 rounded-full text-xs"
              >
                OUR STORY
              </Link>
            </div>

            {/* Compact value badges for screens without the side card */}
            <div className="flex lg:hidden flex-wrap gap-2 mt-8">
              {VALUE_BADGES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white"
                >
                  <Icon size={13} className="text-[#D4AF37]" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Floating Value Badges card (desktop) */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-[10px] shadow-xl border border-white/20 flex flex-col gap-3.5">
              {VALUE_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-white"
                >
                  <Icon size={16} className="text-[#D4AF37]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};
