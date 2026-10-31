/**
 * ProductFilters
 * Sidebar filters for category selection, price range, rating threshold,
 * stock availability, and sorting controls.
 *
 * @param {string} selectedCategory - currently active category slug
 * @param {Function} onSelectCategory - category change callback
 * @param {string} priceRange - current price range filter
 * @param {Function} onSelectPriceRange - price filter callback
 * @param {number} minRating - current minimum rating filter
 * @param {Function} onSelectMinRating - rating filter callback
 * @param {Function} onReset - reset all filters to initial state
 *
 * Used in: Shop page sidebar
 */

import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { Star, RotateCcw } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  priceRange: string;
  onSelectPriceRange: (range: string) => void;
  minRating: number;
  onSelectMinRating: (rating: number) => void;
  inStockOnly: boolean;
  onToggleInStockOnly: (val: boolean) => void;
  onReset: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onSelectPriceRange,
  minRating,
  onSelectMinRating,
  inStockOnly,
  onToggleInStockOnly,
  onReset,
}) => {
  return (
    <aside className="space-y-7">
      {/* Product Categories (Matching mockup sidebar!) */}
      <div>
        <h3 className="font-serif text-base font-bold text-[#B57BFF] pb-2 border-b border-[#2E2045] mb-3">
          Product Categories
        </h3>
        <ul className="space-y-1 text-xs">
          <li>
            <button
              onClick={() => onSelectCategory('all')}
              className={`w-full text-left py-2 px-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#2A1D3F] text-[#F1EAFB] font-bold'
                  : 'text-[#C9BFDD] hover:bg-[#1E1430] hover:text-[#D4AF37]'
              }`}
            >
              <span>All Products</span>
            </button>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full text-left py-2 px-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-[#2A1D3F] text-[#F1EAFB] font-bold'
                    : 'text-[#C9BFDD] hover:bg-[#1E1430] hover:text-[#D4AF37]'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[11px] text-[#A99BC4]">({cat.itemCount})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-serif text-base font-bold text-[#B57BFF] pb-2 border-b border-[#2E2045] mb-3">
          Price Range
        </h3>
        <div className="space-y-2 text-xs">
          {[
            { label: 'All Prices', val: 'all' },
            { label: 'Under $10', val: 'under-10' },
            { label: '$10 to $20', val: '10-20' },
            { label: 'Over $20', val: 'over-20' },
          ].map((opt) => (
            <label
              key={opt.val}
              className="flex items-center gap-2.5 text-[#C9BFDD] cursor-pointer hover:text-[#D4AF37]"
            >
              <input
                type="radio"
                name="priceFilter"
                checked={priceRange === opt.val}
                onChange={() => onSelectPriceRange(opt.val)}
                className="accent-[#D4AF37] cursor-pointer"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div>
        <h3 className="font-serif text-base font-bold text-[#B57BFF] pb-2 border-b border-[#2E2045] mb-3">
          Customer Rating
        </h3>
        <div className="space-y-2 text-xs">
          {[
            { label: 'All Ratings', stars: 0 },
            { label: '4.8 ★ & above', stars: 4.8 },
            { label: '4.5 ★ & above', stars: 4.5 },
          ].map((opt) => (
            <label
              key={opt.stars}
              className="flex items-center gap-2.5 text-[#C9BFDD] cursor-pointer hover:text-[#D4AF37]"
            >
              <input
                type="radio"
                name="ratingFilter"
                checked={minRating === opt.stars}
                onChange={() => onSelectMinRating(opt.stars)}
                className="accent-[#D4AF37] cursor-pointer"
              />
              <span className="flex items-center gap-1">
                {opt.label}
                {opt.stars > 0 && <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" />}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Toggle */}
      <div>
        <h3 className="font-serif text-base font-bold text-[#B57BFF] pb-2 border-b border-[#2E2045] mb-3">
          Availability
        </h3>
        <label className="flex items-center gap-2.5 text-xs text-[#C9BFDD] cursor-pointer hover:text-[#D4AF37]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStockOnly(e.target.checked)}
            className="accent-[#D4AF37] rounded cursor-pointer"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Reset Action */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-[#34254D] hover:bg-[#2A1D3F] text-xs font-semibold text-[#C9BFDD] hover:text-[#D4AF37] transition-colors cursor-pointer"
      >
        <RotateCcw size={13} />
        <span>Reset Filters</span>
      </button>
    </aside>
  );
};
