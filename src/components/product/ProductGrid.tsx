/**
 * ProductGrid
 * Renders an adaptive responsive grid of ProductCard components
 * with empty state handling.
 *
 * @param {Product[]} products - list of products to display
 * @param {Function} onQuickView - optional quick view modal callback
 *
 * Used in: Shop page, Category view
 */

import React from 'react';
import { Product } from '../../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  showCategory?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  showCategory = false,
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-[#140C1F] rounded-2xl border border-[#2E2045] p-8">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#0B0710] flex items-center justify-center text-[#D4AF37]">
        </div>
        <h4 className="font-serif text-lg font-bold text-[#F5ECD7] mb-1">
          No Products Found
        </h4>
        <p className="text-xs text-[#B0A99C] max-w-sm mx-auto">
          We couldn't find any items matching your selected filters. Try resetting the filters or searching with different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          showCategory={showCategory}
        />
      ))}
    </div>
  );
};
