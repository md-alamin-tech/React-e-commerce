/**
 * ProductCard
 * Displays a single product with image, title, price, origin,
 * and quick actions (view product, add to cart, wishlist toggle).
 *
 * @param {Product} product - product data object
 * @param {Function} onAddToCart - optional custom add to cart handler
 * @param {Function} onQuickView - optional quick view modal opener
 *
 * Used in: Shop page, Home (Featured Products), Related Products
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/constants';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  showCategory = false,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group flex flex-col bg-[#140C1F] rounded-2xl border border-[#2A1D3F] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      {/* Image Container with Badges & Hover Actions */}
      <div className="relative aspect-4/3 w-full bg-[#1B1229] overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Wishlist toggle button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all shadow-xs cursor-pointer ${
            isWishlisted
              ? 'bg-rose-950/60 text-rose-400'
              : 'bg-[#140C1F]/90 text-[#E6DFCF] hover:text-[#D4AF37] hover:bg-[#1E1430]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} className={isWishlisted ? 'fill-[#D4AF37]' : ''} />
        </button>

        {/* Quick View trigger on hover */}
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="hidden sm:flex absolute bottom-2.5 left-2.5 items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#140C1F]/95 text-[#F5ECD7] text-xs font-medium shadow-xs hover:bg-[#1E1430] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Eye size={13} />
            Quick View
          </button>
        )}

        {/* Discount or Origin Tag */}
        {product.originalPrice && product.originalPrice > product.price ? (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#F87171] text-white text-[10px] font-bold tracking-wider uppercase">
            Sale
          </span>
        ) : product.isBestSeller ? (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0B0710] text-[10px] font-bold tracking-wider uppercase">
            Popular
          </span>
        ) : null}
      </div>

      {/* Content details */}
      <div className="flex-1 flex flex-col p-4 text-center">

        <h3 className="font-serif text-base font-semibold text-[#F5ECD7] hover:text-[#D4AF37] transition-colors line-clamp-1">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center justify-center gap-2 mt-1.5 mb-3">
          <span className="font-bold text-sm text-[#F5ECD7]">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-[#B0A99C] line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
          <span className="text-[11px] text-[#B0A99C]">/ {product.weight}</span>
        </div>

        {/* Button: "VIEW PRODUCT ->" matching mockup! */}
        <div className="mt-auto pt-1 flex items-center gap-2">
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0B0710] font-semibold tracking-wider uppercase transition-colors h-12 px-4 rounded-full text-xs"
          >
            <span>VIEW PRODUCT</span>
            <ArrowRight size={13} />
          </Link>

          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="p-2 rounded-md bg-[#0B0710] hover:bg-[#D4AF37] text-[#F5ECD7] hover:text-[#0B0710] border border-[#2E2045] transition-colors cursor-pointer"
            title="Quick add to cart"
            aria-label="Add to cart"
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
