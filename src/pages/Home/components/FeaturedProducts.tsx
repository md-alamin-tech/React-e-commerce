/**
 * FeaturedProducts
 * Displays the curated row of 6 core staple products from the Belké Market mockup.
 *
 * Used in: Home page
 */

import React, { useState } from 'react';
import { PRODUCTS, Product } from '../../../data/products';
import { ProductCard } from '../../../components/product/ProductCard';
import { QuickViewModal } from '../../../components/product/QuickViewModal';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Take the 6 primary featured products matching the mockup
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="bg-[#0B0710] py-16 lg:py-20 border-b border-[#2E2045]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5ECD7] uppercase tracking-wide">
              FEATURED PRODUCTS
            </h2>
            <p className="text-xs text-[#A99BC4] mt-1">
              Hand-picked favorites loved by our patrons and families.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#B8962E] transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
