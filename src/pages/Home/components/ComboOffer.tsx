/**
 * ComboOffer
 * "Trending Food Combo Offer Less 20%": three selectable combos on the left,
 * big photo on the right that follows the selected combo.
 *
 * Used in: Home page
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BTN_GREEN, productImage } from '../homeData';
import { SectionTitle } from './SectionTitle';

const COMBOS = [
  {
    id: 'combo-1',
    title: '20% Off Super Burger & French Fries',
    desc: 'Crispy fries and a juicy burger, ready in minutes.',
    image: productImage('prod-cevapi'),
  },
  {
    id: 'combo-2',
    title: 'Cheesy Pizza With Cold Drink',
    desc: 'Hot, cheesy and freshly baked every morning.',
    image: productImage('prod-burek'),
  },
  {
    id: 'combo-3',
    title: 'Dairy Newburger With Drinks & Sauce',
    desc: 'A creamy classic served with your favourite sauce.',
    image: productImage('prod-kashkaval'),
  },
];

export const ComboOffer: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const current = COMBOS[selected];

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2">
        {/* Left: copy */}
        <div className="px-4 sm:px-10 lg:pl-[max(1.5rem,calc((100vw_-_1320px)/2_+_1.5rem))] lg:pr-14 py-16 lg:py-20 flex flex-col justify-center">
          <SectionTitle
            center={false}
            title={
              <>
                Trending Food Combo
                <br />
                Offer Less <span className="text-brand">20%</span>
              </>
            }
          />
          <p className="text-ink/70 leading-relaxed mt-5 max-w-lg">
            A team of dreamers and best building unique interactive meals and service for every
            family table, made fresh with traditional recipes.
          </p>

          <div className="mt-8 space-y-3 max-w-lg">
            {COMBOS.map((combo, i) => {
              const active = i === selected;
              return (
                <button
                  key={combo.id}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center gap-4 text-left rounded-xl px-4 py-3 border transition-colors cursor-pointer ${
                    active
                      ? 'bg-sun border-sun'
                      : 'bg-white border-black/10 hover:border-sun'
                  }`}
                >
                  <img
                    src={combo.image}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="block font-serif text-base font-semibold text-ink">
                      {combo.title}
                    </span>
                    <span className="block text-xs text-ink/70 mt-0.5">{combo.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <Link to="/shop" className={`${BTN_GREEN} mt-8 self-start`}>
            <span>Order Now</span>
          </Link>
        </div>

        {/* Right: photo */}
        <div className="relative isolate min-h-[360px] lg:min-h-[560px] bg-[#141414]">
          <img
            key={current.id}
            src={current.image}
            alt={current.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <p className="absolute left-8 bottom-6 font-hand text-5xl sm:text-6xl text-white drop-shadow-lg">
            today's best food
          </p>
        </div>
      </div>
    </section>
  );
};
