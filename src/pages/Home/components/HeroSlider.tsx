/**
 * HeroSlider
 * Full-width dark hero with a 3-image fade slider (auto-plays, pauses on hover),
 * large condensed headline, "Order Now" button, round product plate and a 50% badge.
 *
 * Used in: Home page
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { BG, BTN_GREEN, productImage } from '../homeData';

const SLIDES = [
  {
    id: 'fried-chicken',
    label: 'Crispy, Every Bite Taste',
    title: ['AWESOME', 'FRIED', 'CHICKEN'],
    bg: BG.feast,
    plate: productImage('prod-cevapi'),
  },
  {
    id: 'super-burger',
    label: 'Crispy, Every Bite Taste',
    title: ['SUPER', 'DELICIOUS', 'BURGER'],
    bg: BG.market,
    plate: productImage('prod-burek'),
  },
  {
    id: 'hot-pizza',
    label: 'Crispy, Every Bite Taste',
    title: ['CHEESY', 'HOT', 'PIZZA'],
    bg: BG.spread,
    plate: productImage('prod-baklava'),
  },
];

export const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const go = (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#0d0d0d] min-h-[560px] lg:min-h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.id}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.bg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Dark overlays keep the headline readable on any photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="relative h-full max-w-[1320px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 items-center gap-10 py-20 lg:py-24">
              {/* Copy */}
              <div
                className={`transition-all duration-700 delay-300 ${
                  active ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <p className="font-serif text-lg sm:text-xl font-semibold text-sun tracking-wide mb-3">
                  {slide.label}
                </p>
                <h1 className="font-serif font-bold text-white uppercase leading-[0.95] text-6xl sm:text-7xl lg:text-8xl">
                  {slide.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
                <Link to="/shop" className={`${BTN_GREEN} mt-9`}>
                  <ShoppingBag size={17} className="text-white" />
                  <span>Order Now</span>
                </Link>
              </div>

              {/* Plate + badge */}
              <div
                className={`relative hidden lg:flex justify-center transition-all duration-700 delay-500 ${
                  active ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
              >
                <div className="relative w-[440px] h-[440px] rounded-full border-[10px] border-white/15 p-3">
                  <img
                    src={slide.plate}
                    alt=""
                    className="w-full h-full rounded-full object-cover shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                  />
                </div>
                <div className="absolute top-2 right-14 w-28 h-28 rounded-full bg-brand text-white flex flex-col items-center justify-center rotate-12 shadow-xl">
                  <span className="font-serif text-4xl font-bold leading-none">50%</span>
                  <span className="font-serif text-sm tracking-widest">OFF</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        className="hidden md:flex absolute z-20 left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-brand backdrop-blur text-white items-center justify-center transition-colors cursor-pointer"
        aria-label="Previous slide"
      >
        <ArrowLeft size={20} className="text-white" />
      </button>
      <button
        onClick={() => go(1)}
        className="hidden md:flex absolute z-20 right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-brand backdrop-blur text-white items-center justify-center transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <ArrowRight size={20} className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute z-20 bottom-6 inset-x-0 flex items-center justify-center gap-2.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              i === index ? 'w-8 bg-brand' : 'w-2.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
