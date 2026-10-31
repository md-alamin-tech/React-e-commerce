/**
 * HeroSection
 * Landing hero banner featuring brand tagline, cursive script typography,
 * dual call-to-actions, hero feast photography, and core value floating badges.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, HeartHandshake, Award, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] py-12 lg:py-16 border-b border-[#E8DAC5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            {/* Tagline */}
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#B88847] mb-3">
              EUROPEAN GROCERIES • BALKAN FLAVORS • LOCAL COMMUNITY
            </span>

            {/* Headline with serif and cursive script */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#263620] tracking-tight leading-[1.15] mb-6">
              A LITTLE TASTE <br />
              OF HOME, <br />
              <span className="font-script font-normal text-5xl sm:text-6xl lg:text-7xl text-[#B88847] block -mt-2">
                close to home.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#5C5850] max-w-md leading-relaxed mb-8">
              Discover artisan cheeses, slow-simmered ajvar, crispy spiral burek, hand-stretched phyllo pastries, and beloved European pantry staples delivered fresh to your table.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#263620] hover:bg-[#1C2916] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow active:scale-98"
              >
                <span>EXPLORE OUR PRODUCTS</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[#263620] hover:bg-[#263620]/5 text-[#263620] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all active:scale-98"
              >
                OUR STORY
              </Link>
            </div>
          </div>

          {/* Right Hero Image with Floating Badges */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFFFF]">
              <img
                src="/assets/aistudio/418DF6A8-A9E9-410B-B7B8-20AFB3597616_6d2f0595.png"
                alt="European and Balkan culinary feast overlooking the historic river bridge"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Value Badges (Matching mockup right side pill card!) */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 lg:-left-8 bg-[#FFFFFF]/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#E8DAC5] flex-col gap-3">
              <div className="flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-[#263620]">
                <Award size={16} className="text-[#B88847]" />
                <span>QUALITY</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-[#263620]">
                <ShieldCheck size={16} className="text-[#B88847]" />
                <span>TRADITION</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-[#263620]">
                <HeartHandshake size={16} className="text-[#B88847]" />
                <span>COMMUNITY</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-[#263620]">
                <Sparkles size={16} className="text-[#B88847]" />
                <span>AUTHENTIC FLAVORS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
