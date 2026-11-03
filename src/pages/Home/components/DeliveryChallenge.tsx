/**
 * DeliveryChallenge
 * Green rounded banner: "30 Minutes Fast Delivery Challenge" with a delivery rider icon.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Bike } from 'lucide-react';

export const DeliveryChallenge: React.FC = () => (
  <section className="bg-cream pb-16 lg:pb-20">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-3xl bg-leaf text-white px-8 sm:px-14 py-12 lg:py-14 grid lg:grid-cols-2 items-center gap-8">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute right-40 -bottom-32 w-72 h-72 rounded-full bg-white/5" />

        <div className="relative">
          <p className="font-serif text-lg font-semibold text-sun tracking-wide">
            Crispy, Every Bite Taste
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mt-2">
            30 Minutes Fast
            <br />
            Delivery Challenge
          </h2>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white hover:bg-sun text-ink font-serif font-medium tracking-wide uppercase text-sm transition-colors mt-8"
          >
            <span>Order Now</span>
          </Link>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-white/15 flex items-center justify-center">
            <Bike size={120} strokeWidth={1.4} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  </section>
);
