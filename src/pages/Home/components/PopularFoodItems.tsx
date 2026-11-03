/**
 * PopularFoodItems
 * Four-up category carousel (arrow buttons rotate the list). The hovered card turns
 * brand red (#D12525) with white text; the first card is red by default.
 *
 * Used in: Home page
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { productImage } from '../homeData';

interface FoodItem {
  label: string;
  count: number;
  image: string;
  to: string;
}

const ITEMS: FoodItem[] = [
  { label: 'Chiken', count: 8, image: productImage('prod-cevapi'), to: '/shop?category=frozen-foods' },
  { label: 'Pro Burger', count: 3, image: productImage('prod-burek'), to: '/shop?category=bread-bakery' },
  { label: 'Pro Pasta', count: 3, image: productImage('prod-ajvar'), to: '/shop?category=pantry-condiments' },
  { label: 'Pro Pizza', count: 3, image: productImage('prod-baklava'), to: '/shop?category=sweets-desserts' },
  { label: 'Dairy & Cheese', count: 14, image: productImage('prod-feta'), to: '/shop?category=dairy-cheese' },
  { label: 'Meats & Deli', count: 12, image: productImage('prod-sudzuk'), to: '/shop?category=meats-deli' },
  { label: 'Beverages', count: 10, image: productImage('prod-coffee'), to: '/shop?category=beverages' },
  { label: 'Specialties', count: 15, image: productImage('prod-olive-oil'), to: '/shop?category=european-specialties' },
];

const VISIBLE = 4;

export const PopularFoodItems: React.FC = () => {
  const [start, setStart] = useState(0);
  const [active, setActive] = useState(0);

  const visible = Array.from({ length: VISIBLE }, (_, i) => ITEMS[(start + i) % ITEMS.length]);
  const shift = (dir: number) => setStart((s) => (s + dir + ITEMS.length) % ITEMS.length);

  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <SectionTitle title="Popular Food Items" center={false} />
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => shift(-1)}
              aria-label="Previous"
              className="w-14 h-14 rounded-full border border-black/10 bg-transparent hover:bg-white text-brand flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} className="text-brand" />
            </button>
            <button
              onClick={() => shift(1)}
              aria-label="Next"
              className="w-14 h-14 rounded-full bg-brand hover:bg-brand-dark text-white flex items-center justify-center shadow-[0_10px_24px_rgba(209,37,37,0.35)] transition-colors cursor-pointer"
            >
              <ArrowRight size={20} className="text-white" />
            </button>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]"
          onMouseLeave={() => setActive(0)}
        >
          {visible.map((item, i) => {
            const isActive = active === i;
            return (
              <Link
                key={`${item.label}-${i}`}
                to={item.to}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group flex flex-col items-center text-center rounded-2xl px-6 pt-8 pb-9 transition-colors duration-300 ${
                  isActive ? 'bg-brand' : 'bg-white'
                }`}
              >
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.18)] bg-white/10">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3
                  className={`font-serif text-3xl font-semibold mt-8 transition-colors ${
                    isActive ? 'text-white' : 'text-ink'
                  }`}
                >
                  {item.label}
                </h3>
                <span
                  className={`block w-14 h-0.5 mt-2 transition-colors ${
                    isActive ? 'bg-white' : 'bg-brand'
                  }`}
                />
                <p
                  className={`font-serif text-lg font-medium mt-2 transition-colors ${
                    isActive ? 'text-white' : 'text-brand'
                  }`}
                >
                  {item.count} Products
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
