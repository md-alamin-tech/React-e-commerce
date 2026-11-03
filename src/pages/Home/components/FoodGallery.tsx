/**
 * FoodGallery
 * Edge-to-edge strip of six food photos above the footer.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../data/products';

const IDS = ['prod-cevapi', 'prod-baklava', 'prod-burek', 'prod-feta', 'prod-sudzuk', 'prod-olives'];

export const FoodGallery: React.FC = () => {
  const items = IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="bg-cream">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {items.map((p) => (
          <Link
            key={p!.id}
            to={`/product/${p!.slug}`}
            className="block h-40 sm:h-52 lg:h-56"
            aria-label={p!.name}
          >
            <img src={p!.images[0]} alt={p!.name} className="w-full h-full object-cover" loading="lazy" />
          </Link>
        ))}
      </div>
    </section>
  );
};
