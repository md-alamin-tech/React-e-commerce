/**
 * PopularFastFoods
 * 8-product grid. On hover a card turns yellow, the white photo box goes transparent,
 * the discount tag turns white and an "Add To Cart" pill appears over the photo.
 * The heart button toggles the wishlist. Discount tags show only for products
 * that have an originalPrice in the catalog.
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { PRODUCTS } from '../../../data/products';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { SectionTitle } from './SectionTitle';
import { BTN_GREEN } from '../homeData';

const money = (value: number) => `${value.toFixed(2)}$`;

export const PopularFastFoods: React.FC = () => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const items = [...PRODUCTS].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 8);

  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <SectionTitle title="Popular Fast Foods" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-12">
          {items.map((p) => {
            const hasDiscount = !!p.originalPrice && p.originalPrice > p.price;
            const percent = hasDiscount
              ? Math.round((1 - p.price / (p.originalPrice as number)) * 100)
              : 0;
            const wished = isInWishlist(p.id);

            return (
              <div
                key={p.id}
                className="group rounded-2xl pb-7 transition-colors duration-300 hover:bg-sun"
              >
                {/* Photo box */}
                <div className="relative aspect-[4/3] rounded-2xl bg-white group-hover:bg-transparent transition-colors duration-300">
                  <Link to={`/product/${p.slug}`} className="block w-full h-full p-5">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full rounded-xl object-cover"
                      loading="lazy"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(p)}
                    aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                    className="absolute z-10 top-4 left-4 w-10 h-10 rounded-lg bg-ink text-white flex items-center justify-center hover:bg-brand transition-colors cursor-pointer"
                  >
                    <Heart size={19} className={wished ? 'fill-white text-white' : 'text-white'} />
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart(p, 1)}
                    className="absolute z-10 bottom-3 left-1/2 -translate-x-1/2 w-[82%] h-11 rounded-full bg-ink text-white font-serif text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer hover:bg-brand md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                  >
                    Add To Cart
                  </button>
                </div>

                {/* Price + name */}
                <div className="mt-6 flex items-center justify-center gap-3 font-serif">
                  {hasDiscount && (
                    <span className="px-2.5 py-0.5 rounded-sm bg-sun group-hover:bg-white text-ink text-sm font-medium transition-colors">
                      -{percent}%
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="text-ink/60 line-through text-sm">
                      {money(p.originalPrice as number)}
                    </span>
                  )}
                  <span className="text-ink text-sm font-medium">{money(p.price)}</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-ink text-center mt-3 px-4 line-clamp-1">
                  <Link to={`/product/${p.slug}`} className="hover:text-brand transition-colors">
                    {p.name}
                  </Link>
                </h3>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/shop" className={BTN_GREEN}>
            <span>View More</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
