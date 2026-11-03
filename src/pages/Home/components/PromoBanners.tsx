/**
 * PromoBanners
 * Two promotional banners under the category row:
 *  - dark "SUPER DELICIOUS / 50% OFF" burger banner
 *  - red "Super Delicious Cheese Pizza / Limited Offer" banner
 * Text sits above a gradient overlay so it stays readable on any photo.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { productImage } from '../homeData';

export const PromoBanners: React.FC = () => {
  return (
    <section className="bg-cream pb-16 lg:pb-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[41fr_59fr] gap-[30px]">
        {/* Banner 1: dark */}
        <Link
          to="/shop"
          className="group relative block overflow-hidden rounded-2xl bg-[#241d19] min-h-[350px]"
        >
          <img
            src={productImage('prod-sudzuk')}
            alt=""
            className="absolute right-0 top-0 h-full w-[68%] object-cover transition-transform duration-500 group-hover:scale-105 [mask-image:linear-gradient(to_left,black_45%,transparent)]"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

          <div className="relative z-10 h-full min-h-[350px] p-8 sm:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <p className="font-serif text-sm sm:text-base font-semibold uppercase tracking-wide text-brand">
                Crispy, Every Bite Taste
              </p>
              <span className="font-hand text-3xl text-sun -rotate-6">Burger</span>
            </div>
            <h3 className="font-serif text-5xl sm:text-6xl font-bold uppercase leading-[1.05] text-white mt-3 max-w-[260px]">
              Super Delicious
            </h3>
            <div className="mt-5 w-24 h-24 rounded-full border-2 border-white/80 flex flex-col items-center justify-center -rotate-6">
              <span className="font-hand text-3xl text-white leading-none">50%</span>
              <span className="font-serif text-xl font-bold text-sun leading-none mt-1">OFF</span>
            </div>
          </div>
        </Link>

        {/* Banner 2: red */}
        <Link
          to="/shop?category=bread-bakery"
          className="group relative block overflow-hidden rounded-2xl bg-brand min-h-[350px]"
        >
          {/* Cream swoosh in the lower right */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_115%,#ecd9a8_0,#ecd9a8_46%,transparent_46.5%)]" />
          <img
            src={productImage('prod-burek', 1)}
            alt=""
            className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] rounded-full object-cover border-[10px] border-[#f3e2b3] shadow-[0_24px_50px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:rotate-6"
          />

          <div className="relative z-10 h-full min-h-[350px] p-8 sm:p-10 flex flex-col justify-center">
            <p className="font-hand text-2xl sm:text-3xl text-white -rotate-3">today's best deal</p>
            <p className="font-hand text-5xl sm:text-6xl text-sun leading-none mt-2">Super</p>
            <p className="font-hand text-5xl sm:text-6xl text-white leading-none ml-3 -mt-1">
              Delicious
            </p>
            <p className="font-serif text-4xl sm:text-5xl font-bold uppercase text-sun leading-none mt-1">
              Cheese Pizza
            </p>
            <p className="font-hand text-2xl text-white mt-3">Limited Offer</p>
          </div>
        </Link>
      </div>
    </section>
  );
};
