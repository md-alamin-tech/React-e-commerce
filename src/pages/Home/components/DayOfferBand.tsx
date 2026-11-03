/**
 * DayOfferBand
 * Dark full-width band: "Save 20%" tag, "Today's Astackin Day" headline,
 * "Grilled Chikos $59.88" and a round plate photo on the right.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { BTN_GREEN, productImage } from '../homeData';

export const DayOfferBand: React.FC = () => (
  <section className="relative isolate overflow-hidden bg-[#141414] py-16 lg:py-20">
    <span className="pointer-events-none select-none absolute -right-4 bottom-2 font-hand text-[110px] sm:text-[150px] leading-none text-white/[0.06]">
      today's best food
    </span>

    <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 items-center gap-12">
      <div>
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand text-white font-serif text-sm font-medium tracking-wide">
          Save 20%
        </span>
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mt-5">
          Today's Astackin Day
        </h2>
        <p className="font-serif text-2xl sm:text-3xl text-white/90 mt-5">
          Grilled Chikos <span className="text-sun font-semibold">$59.88</span>
        </p>
        <Link to="/shop" className={`${BTN_GREEN} mt-8`}>
          <span>Order Now</span>
        </Link>
      </div>

      <div className="flex justify-center lg:justify-end">
        <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border-[10px] border-white/10 p-3">
          <img
            src={productImage('prod-przut')}
            alt="Grilled chicken plate"
            className="w-full h-full rounded-full object-cover shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
          />
          <div className="absolute -top-2 -left-2 w-24 h-24 rounded-full bg-brand text-white flex flex-col items-center justify-center -rotate-12 shadow-xl">
            <span className="font-serif text-3xl font-bold leading-none">20%</span>
            <span className="font-serif text-xs tracking-widest">OFF</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
