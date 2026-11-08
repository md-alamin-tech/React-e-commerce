/**
 * Wishlist
 * Displays user's saved favorite products with quick-add to cart capability.
 *
 * Used in: /wishlist route
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../../components/product/ProductCard';
import { Button } from '../../components/common/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';

export default function Wishlist() {
  useDocumentTitle('My Wishlist - EMBER');
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item, 1);
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-cream py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-10 rounded-2xl border border-black/10 shadow-xs">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center text-brand">
            <Heart size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-ink mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs sm:text-sm text-ink/60 mb-6">
            Tap the heart icon on any product in our store to save it to your personal wishlist!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 bg-brand text-white font-medium tracking-wide uppercase transition-colors h-12 px-8 rounded-full font-serif text-sm"
          >
            <span>Discover Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream py-10 sm:py-14">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              My Wishlist
            </h1>
            <p className="text-xs text-ink/60 mt-0.5">
              {wishlist.length} saved item{wishlist.length === 1 ? '' : 's'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm" onClick={handleAddAllToCart}>
              Add All to Cart
            </Button>
            <button
              onClick={clearWishlist}
              className="inline-flex items-center gap-1 text-xs text-ink/60 hover:text-brand underline cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Clear Wishlist</span>
            </button>
          </div>
        </div>

        {/* Wishlist Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} showCategory />
          ))}
        </div>
      </div>
    </div>
  );
}
