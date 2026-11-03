/**
 * HotWingCountdown
 * Split offer: red photo panel on the left, cream panel with live countdown
 * (Day / Hour / Min / Sec) and "Order Now" on the right.
 *
 * Used in: Home page
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from './SectionTitle';
import { BTN_GREEN, productImage } from '../homeData';

// Offer end time (local). Counts down live; shows zeros once it has passed.
const OFFER_END = new Date('2026-12-04T10:00:00').getTime();

const pad = (n: number) => String(n).padStart(2, '0');

const getRemaining = () => {
  const diff = Math.max(0, OFFER_END - Date.now());
  return {
    day: Math.floor(diff / 86_400_000),
    hour: Math.floor((diff / 3_600_000) % 24),
    min: Math.floor((diff / 60_000) % 60),
    sec: Math.floor((diff / 1000) % 60),
  };
};

export const HotWingCountdown: React.FC = () => {
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const timer = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units: [string, number][] = [
    ['Day', time.day],
    ['Hour', time.hour],
    ['Min', time.min],
    ['Sec', time.sec],
  ];

  return (
    <section className="bg-cream">
      <div className="grid lg:grid-cols-2">
        {/* Photo panel */}
        <div className="relative isolate bg-brand min-h-[360px] lg:min-h-[460px] overflow-hidden flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
          <img
            src={productImage('prod-sudzuk')}
            alt="Hot wings and french fries"
            className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full object-cover border-[10px] border-white/30 shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
          />
        </div>

        {/* Countdown panel */}
        <div className="flex flex-col justify-center items-center text-center px-6 py-14 lg:py-16">
          <SectionTitle title="Kfc Chiken Hot Wing & French Fries" />
          <div className="flex items-center justify-center gap-3 sm:gap-5 mt-9">
            {units.map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-xl bg-white shadow-[0_10px_26px_rgba(0,0,0,0.08)] flex items-center justify-center font-serif text-4xl sm:text-5xl font-bold text-brand">
                  {pad(value)}
                </div>
                <p className="font-serif text-sm uppercase tracking-wider text-ink mt-2">{label}</p>
              </div>
            ))}
          </div>
          <Link to="/shop" className={`${BTN_GREEN} mt-9`}>
            <span>Order Now</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
