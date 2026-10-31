/**
 * Navbar
 * Primary application header with navigation links, live search bar with suggestions,
 * wishlist counter, shopping cart indicator, user profile button, and "VISIT US" CTA.
 *
 * Used in: Layout wrapper
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User as UserIcon, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS, Product } from '../../data/products';
import { useDebounce } from '../../hooks/useDebounce';
import { formatCurrency } from '../../utils/constants';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 250);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // On the home page the header floats over the hero image (transparent),
  // then turns solid once the user scrolls.
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = isHome && !scrolled && !mobileMenuOpen;

  const iconBtn = transparent
    ? 'text-white hover:text-[#E3C28D] hover:bg-white/15'
    : 'text-[#3E3B36] hover:text-[#B88847] hover:bg-[#F2ECE1]';

  // Live search filtering
  useEffect(() => {
    if (debouncedSearch.trim().length > 1) {
      const q = debouncedSearch.toLowerCase();
      const matches = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q)
      ).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  const handleSelectProduct = (product: Product) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${product.slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Products', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Recipes', path: '/recipes' },
    { label: 'Coming Soon', path: '/coming-soon' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky z-40 border-b transition-all duration-300 ${
        isHome ? '-mb-[81px]' : ''
      } ${
        scrolled
          ? 'top-3 bg-transparent border-transparent'
          : transparent
            ? 'top-0 bg-transparent border-transparent translate-y-5'
            : 'top-0 bg-[#FAF7F2]/95 backdrop-blur-md border-[#E8DAC5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center">
        <div
          className={`w-full flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'h-16 px-5 sm:px-6 rounded-2xl bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.25)]'
              : 'h-20'
          }`}
        >
          {/* Brand Logo with Olive Branches */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex flex-col items-center">
              {/* Olive leaf decorative SVG emblem */}
              <svg
                className={`w-8 h-4 group-hover:text-[#B88847] transition-colors ${
                  transparent ? 'text-white' : 'text-[#263620]'
                }`}
                viewBox="0 0 100 40"
                fill="currentColor"
              >
                <path d="M50 35 C40 25, 20 28, 5 20 C22 15, 38 18, 50 35 Z" opacity="0.9" />
                <path d="M50 35 C60 25, 80 28, 95 20 C78 15, 62 18, 50 35 Z" opacity="0.9" />
                <circle cx="50" cy="18" r="4" fill="#B88847" />
                <path d="M46 22 Q50 15 54 22" stroke="#263620" strokeWidth="2" fill="none" />
              </svg>
              <div className="flex flex-col items-center leading-none">
                <span
                  className={`font-serif text-xl sm:text-2xl font-bold tracking-widest uppercase transition-colors ${
                    transparent ? 'text-white' : 'text-[#263620]'
                  }`}
                >
                  BELKÉ
                </span>
                <span
                  className={`text-[9px] tracking-[0.35em] uppercase font-semibold mt-0.5 transition-colors ${
                    transparent ? 'text-white/80' : 'text-[#7C776E]'
                  }`}
                >
                  MARKET
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? transparent
                        ? 'text-[#E3C28D] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E3C28D]'
                        : 'text-[#B88847] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#B88847]'
                      : transparent
                        ? 'text-white/90 hover:text-[#E3C28D]'
                        : 'text-[#3E3B36] hover:text-[#B88847]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon / Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className={`p-2 rounded-full transition-colors cursor-pointer ${iconBtn}`}
                title="Search products"
                aria-label="Search"
              >
                <Search size={19} />
              </button>

              {/* Live Search Modal Popover */}
              {searchOpen && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-[#FFFFFF] rounded-2xl shadow-xl border border-[#E8DAC5] p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search ajvar, feta, burek, coffee..."
                      className="w-full bg-[#FAF7F2] border border-[#DDD6C8] rounded-xl pl-9 pr-8 py-2 text-sm text-[#263620] focus:outline-none focus:border-[#B88847]"
                    />
                    <Search
                      size={16}
                      className="absolute left-3 top-2.5 text-[#8F8A80]"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-2.5 text-[#8F8A80] hover:text-[#263620]"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </form>

                  {/* Suggestions list */}
                  {suggestions.length > 0 && (
                    <div className="mt-3 divide-y divide-[#F0EAE0]">
                      <p className="text-[11px] font-semibold text-[#8F8A80] uppercase tracking-wider px-2 py-1">
                        Matching Products
                      </p>
                      {suggestions.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => handleSelectProduct(prod)}
                          className="flex items-center gap-3 p-2 hover:bg-[#FAF7F2] rounded-lg cursor-pointer transition-colors"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                          <div className="flex-1 min-w-0 text-left">
                            <p className="text-xs font-semibold text-[#263620] truncate">
                              {prod.name}
                            </p>
                            <p className="text-[11px] text-[#8F8A80]">
                              {prod.categoryName} • {formatCurrency(prod.price)}
                            </p>
                          </div>
                          <ArrowRight size={14} className="text-[#B88847]" />
                        </div>
                      ))}
                    </div>
                  )}

                  {searchQuery.trim().length > 1 && suggestions.length === 0 && (
                    <div className="p-4 text-center text-xs text-[#8F8A80]">
                      No items matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className={`relative p-2 rounded-full transition-colors ${iconBtn}`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute 1 top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#B88847] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className={`relative p-2 rounded-full transition-colors ${iconBtn}`}
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#263620] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Account / Login */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className={`hidden sm:flex items-center gap-1.5 p-2 rounded-full transition-colors text-xs font-medium ${iconBtn}`}
              title={isAuthenticated ? `Account: ${user?.name}` : 'Sign In'}
            >
              <UserIcon size={19} />
              {isAuthenticated && (
                <span className="hidden xl:inline text-xs truncate max-w-[80px]">
                  {user?.name.split(' ')[0]}
                </span>
              )}
            </Link>

            {/* "VISIT US" Button - signature element matching the mockup header! */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#B88847] hover:bg-[#A37538] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-xs hover:shadow"
            >
              VISIT US
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                transparent
                  ? 'text-white hover:bg-white/15'
                  : 'text-[#263620] hover:bg-[#F2ECE1]'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-1 rounded-2xl border border-[#E8DAC5] bg-[#FAF7F2] px-6 py-5 shadow-lg">
          <nav className="flex flex-col space-y-3.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium py-1 ${
                    isActive ? 'text-[#B88847] font-semibold' : 'text-[#263620]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-[#E8DAC5] flex flex-col gap-2.5">
              <Link
                to={isAuthenticated ? '/account' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-[#263620] py-1 font-medium"
              >
                <UserIcon size={18} />
                {isAuthenticated ? `My Account (${user?.name})` : 'Sign In / Register'}
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-[#B88847] text-white text-xs font-semibold tracking-wider uppercase mt-1"
              >
                VISIT US
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
