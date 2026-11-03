/**
 * SpecialCards
 * Two dark offer cards: "Today Special Beef Burger" and "FAST Foods Meal".
 * Photos fade into the card so the text always stays readable.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../data/products';
import { BTN_GREEN, productImage } from '../homeData';

const burger = PRODUCTS.find((p) => p.id === 'prod-cevapi');

export const SpecialCards: React.FC = () => (
  <section className="bg-cream pb-16 lg:pb-20">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-[30px]">
      {/* Card 1 */}
      <div className="relative isolate overflow-hidden rounded-2xl bg-[#1b1b1b] min-h-[320px]">
        <img
          src={productImage('prod-cevapi')}
          alt=""
          className="absolute right-0 top-0 h-full w-[62%] object-cover [mask-image:linear-gradient(to_left,black_50%,transparent)]"
        />
        <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-center min-h-[320px] max-w-[60%]">
          <p className="font-hand text-3xl text-sun -rotate-3">Today Special</p>
          <h3 className="font-serif text-5xl sm:text-6xl font-bold uppercase text-white leading-[1.05] mt-1">
            Beef Burger
          </h3>
          <Link to="/shop" className={`${BTN_GREEN} mt-6 self-start`}>
            <span>Order Now</span>
          </Link>
        </div>
        {burger && (
          <div className="absolute z-10 right-6 bottom-6 w-20 h-20 rounded-full bg-brand text-white flex items-center justify-center font-serif text-lg font-bold shadow-xl">
            ${burger.price.toFixed(2)}
          </div>
        )}
      </div>

      {/* Card 2 */}
      <div className="relative isolate overflow-hidden rounded-2xl bg-[#1b1b1b] min-h-[320px]">
        <img
          src={productImage('prod-sudzuk')}
          alt=""
          className="absolute right-0 top-0 h-full w-[62%] object-cover [mask-image:linear-gradient(to_left,black_50%,transparent)]"
        />
        <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-center min-h-[320px] max-w-[62%]">
          <h3 className="font-serif text-5xl sm:text-6xl font-bold text-white leading-[1.05]">
            <span className="text-sun">FAST</span> Foods
            <br />
            Meal
          </h3>
          <p className="text-sm text-white/75 leading-relaxed mt-3">
            The mouth watering choices of everything in life, packed fresh for your table.
          </p>
          <Link to="/shop" className={`${BTN_GREEN} mt-6 self-start`}>
            <span>Order Now</span>
          </Link>
        </div>
      </div>
    </div>
  </section>
);
