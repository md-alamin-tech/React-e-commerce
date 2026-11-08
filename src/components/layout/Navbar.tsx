/**
 * Navbar
 * Light header: a slim top bar (offer text + socials) followed by a sticky main bar with
 * logo, navigation, live search, wishlist, cart, account and a red "Contact Us" button.
 *
 * Used in: Layout wrapper
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ArrowRight,
  Instagram,
  Facebook,
  Music2,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS, Product } from '../../data/products';
import { useDebounce } from '../../hooks/useDebounce';
import { APP_CONFIG, formatCurrency } from '../../utils/constants';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Shop', path: '/shop' },
  { label: 'Menu', path: '/menu' },
  { label: 'Contact', path: '/contact' },
];

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

  const iconBtn =
    'relative p-2.5 rounded-full text-ink hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer';

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-white border-b border-black/5 text-ink">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-10 flex items-center justify-between text-[13px]">
          <p className="flex items-center gap-2">
            <span className="font-serif font-semibold text-brand">50%</span>
            <span>Savor delivery at best restaurants</span>
            <span className="ml-2 px-2.5 py-0.5 rounded-full bg-leaf/10 text-leaf font-medium text-xs">
              Cash on delivery
            </span>
          </p>
          <div className="flex items-center gap-4">
            <a
              href={APP_CONFIG.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-ink hover:text-brand transition-colors"
            >
              <Facebook size={15} className="text-current" />
            </a>
            <a
              href={APP_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-ink hover:text-brand transition-colors"
            >
              <Instagram size={15} className="text-current" />
            </a>
            <a
              href={APP_CONFIG.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-ink hover:text-brand transition-colors"
            >
              <Music2 size={15} className="text-current" />
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky bar */}
      <header className="sticky top-0 z-40 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="EMBER home">
            <img src="/assets/brand/ember-logo.png" alt="EMBER" className="no-fx h-12 w-auto" />
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-[15px] font-medium transition-colors ${
                    isActive ? 'text-brand' : 'text-ink hover:text-brand'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className={iconBtn}
                title="Search products"
                aria-label="Search"
              >
                <Search size={19} className="text-current" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-black/10 p-3 z-50">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search ajvar, feta, burek, coffee..."
                      className="w-full bg-cream border border-black/10 rounded-lg pl-9 pr-8 py-2 text-sm text-ink focus:outline-none focus:border-brand"
                    />
                    <Search size={16} className="absolute left-3 top-2.5 text-ink/50" />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-2.5 text-ink/50 hover:text-brand"
                        aria-label="Clear search"
                      >
                        <X size={15} className="text-current" />
                      </button>
                    )}
                  </form>

                  {suggestions.length > 0 && (
                    <div className="mt-3 divide-y divide-black/5">
                      <p className="text-[11px] font-semibold text-ink/50 uppercase tracking-wider px-2 py-1">
                        Matching Products
                      </p>
                      {suggestions.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => handleSelectProduct(prod)}
                          className="flex items-center gap-3 p-2 hover:bg-cream rounded-lg cursor-pointer transition-colors"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0 text-left">
                            <p className="text-xs font-semibold text-ink truncate">{prod.name}</p>
                            <p className="text-[11px] text-ink/60">
                              {prod.categoryName} • {formatCurrency(prod.price)}
                            </p>
                          </div>
                          <ArrowRight size={14} className="text-brand" />
                        </div>
                      ))}
                    </div>
                  )}

                  {searchQuery.trim().length > 1 && suggestions.length === 0 && (
                    <div className="p-4 text-center text-xs text-ink/60">
                      No items matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className={iconBtn} title="Wishlist" aria-label="Wishlist">
              <Heart size={19} className="text-current" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className={iconBtn} title="Shopping Cart" aria-label="Cart">
              <ShoppingBag size={19} className="text-current" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className={`hidden sm:flex items-center gap-1.5 ${iconBtn} text-xs font-medium`}
              title={isAuthenticated ? `Account: ${user?.name}` : 'Sign In'}
            >
              <UserIcon size={19} className="text-current" />
              {isAuthenticated && (
                <span className="hidden xl:inline text-xs truncate max-w-[80px]">
                  {user?.name.split(' ')[0]}
                </span>
              )}
            </Link>

            {/* Contact Us */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center justify-center ml-2 h-12 px-8 rounded-full bg-brand hover:bg-brand-dark text-white font-serif font-medium tracking-wide uppercase text-sm transition-colors"
            >
              Contact Us
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-ink hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-current" />
              ) : (
                <Menu size={24} className="text-current" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-black/5 bg-white px-6 py-5">
            <nav className="flex flex-col space-y-3.5">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium py-1 ${isActive ? 'text-brand' : 'text-ink'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-black/5 flex flex-col gap-2.5">
                <Link
                  to={isAuthenticated ? '/account' : '/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-ink py-1 font-medium"
                >
                  <UserIcon size={18} className="text-brand" />
                  {isAuthenticated ? `My Account (${user?.name})` : 'Sign In / Register'}
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-brand text-white font-serif font-medium tracking-wide uppercase inline-flex h-12 px-8 rounded-full text-sm items-center justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
