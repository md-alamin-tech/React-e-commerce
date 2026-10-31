/**
 * Shop
 * Full product catalog page implementing category filtering, price filtering,
 * customer rating filtering, search, sorting, and pagination.
 *
 * Used in: /shop route
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, Product } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { ShopBanner } from './components/ShopBanner';
import { CtaBanner } from './components/CtaBanner';
import { ProductFilters } from '../../components/product/ProductFilters';
import { ProductGrid } from '../../components/product/ProductGrid';
import { QuickViewModal } from '../../components/product/QuickViewModal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export default function Shop() {
  useDocumentTitle('Our Products - Authentic European Groceries');
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Synchronize category query param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1);
    }
  }, [categoryParam]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search term filter
      if (searchParam) {
        const q = searchParam.toLowerCase();
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.origin.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Price range
      if (priceRange === 'under-10' && item.price >= 10) return false;
      if (priceRange === '10-20' && (item.price < 10 || item.price > 20)) return false;
      if (priceRange === 'over-20' && item.price <= 20) return false;

      // Rating
      if (minRating > 0 && item.rating < minRating) return false;

      // Stock
      if (inStockOnly && !item.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchParam, priceRange, minRating, inStockOnly, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const activeCategoryObject = CATEGORIES.find((c) => c.slug === selectedCategory);
  const headingTitle = activeCategoryObject
    ? activeCategoryObject.name
    : searchParam
    ? `Search Results for "${searchParam}"`
    : 'All European Specialties';

  return (
    <div className="bg-[#0B0710] pb-16">
      <ShopBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-1">
            <ProductFilters
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              priceRange={priceRange}
              onSelectPriceRange={(r) => {
                setPriceRange(r);
                setCurrentPage(1);
              }}
              minRating={minRating}
              onSelectMinRating={(r) => {
                setMinRating(r);
                setCurrentPage(1);
              }}
              inStockOnly={inStockOnly}
              onToggleInStockOnly={(v) => {
                setInStockOnly(v);
                setCurrentPage(1);
              }}
              onReset={handleResetFilters}
            />
          </div>

          {/* Right Product Grid Column */}
          <div className="lg:col-span-3">
            {/* Header with Title, Count, Sort, and Mobile Filter Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#2E2045] gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#B57BFF]">
                  {headingTitle}
                </h2>
                <p className="text-xs text-[#A99BC4] mt-0.5">
                  Showing {filteredProducts.length} items
                  {searchParam && (
                    <button
                      onClick={() => {
                        searchParams.delete('search');
                        setSearchParams(searchParams);
                      }}
                      className="ml-2 text-[#F87171] hover:underline text-[11px]"
                    >
                      Clear search
                    </button>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#34254D] bg-[#140C1F] text-xs font-semibold text-[#F1EAFB]"
                >
                  <SlidersHorizontal size={14} />
                  <span>Filters</span>
                </button>

                {/* Sort Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#A99BC4] hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#140C1F] border border-[#34254D] rounded-lg px-3 py-2 text-xs font-medium text-[#F1EAFB] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="featured">Featured / Best Sellers</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            <ProductGrid
              products={paginatedProducts}
              onQuickView={(p) => setQuickViewProduct(p)}
              showCategory={selectedCategory === 'all'}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-[#34254D] bg-[#140C1F] text-[#F1EAFB] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1E1430] transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#D4AF37] text-[#0B0710]'
                        : 'bg-[#140C1F] border border-[#34254D] text-[#C9BFDD] hover:bg-[#1E1430]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-[#34254D] bg-[#140C1F] text-[#F1EAFB] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1E1430] transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Photographic CTA Banner */}
            <CtaBanner onExploreAll={handleResetFilters} />
          </div>
        </div>
      </div>

      {/* Mobile Drawer for Filters */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#0B0710] h-full p-6 shadow-2xl overflow-y-auto flex flex-col z-10">
            <div className="flex items-center justify-between pb-4 border-b border-[#2E2045] mb-4">
              <h3 className="font-serif text-lg font-bold text-[#B57BFF]">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-[#A99BC4] hover:text-[#D4AF37]"
              >
                <X size={20} />
              </button>
            </div>
            <ProductFilters
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                handleCategorySelect(cat);
                setMobileFilterOpen(false);
              }}
              priceRange={priceRange}
              onSelectPriceRange={(r) => {
                setPriceRange(r);
                setCurrentPage(1);
              }}
              minRating={minRating}
              onSelectMinRating={(r) => {
                setMinRating(r);
                setCurrentPage(1);
              }}
              inStockOnly={inStockOnly}
              onToggleInStockOnly={(v) => {
                setInStockOnly(v);
                setCurrentPage(1);
              }}
              onReset={() => {
                handleResetFilters();
                setMobileFilterOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
