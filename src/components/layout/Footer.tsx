/**
 * Footer
 * Light footer: brand blurb, quick links, account links, address, app badges,
 * and a green copyright bar with payment methods.
 *
 * Used in: Layout wrapper
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram, Facebook, Music2 } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Shop', path: '/shop' },
  { label: 'Recipes', path: '/recipes' },
  { label: 'Contact', path: '/contact' },
];

const ACCOUNT_LINKS = [
  { label: 'My Profile', path: '/account' },
  { label: 'Order History', path: '/account' },
  { label: 'My Wishlist', path: '/wishlist' },
  { label: 'My Cart', path: '/cart' },
  { label: 'Sign In', path: '/login' },
];

const PAYMENTS = ['VISA', 'MasterCard', 'AMEX', 'PayPal', 'COD'];

export const Footer: React.FC = () => {
  const headingCls = 'font-serif text-xl font-semibold text-ink mb-5';
  const linkCls = 'text-ink/70 hover:text-brand transition-colors';

  return (
    <footer className="bg-cream text-ink">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4" aria-label="EMBER home">
              <img src="/assets/brand/ember-logo.png" alt="EMBER" className="no-fx h-14 w-auto" />
            </Link>
            <p className="text-sm text-ink/70 leading-relaxed mb-5">
              Fresh, fiery fast food made to order. Burgers, wings, pizza and more for every craving.
            </p>
            <a
              href={`mailto:${APP_CONFIG.email}`}
              className="text-sm text-brand font-medium hover:underline"
            >
              {APP_CONFIG.email}
            </a>
            <div className="flex items-center gap-3 mt-5">
              {[
                { href: APP_CONFIG.socials.facebook, label: 'Facebook', icon: <Facebook size={15} className="text-current" /> },
                { href: APP_CONFIG.socials.instagram, label: 'Instagram', icon: <Instagram size={15} className="text-current" /> },
                { href: APP_CONFIG.socials.tiktok, label: 'TikTok', icon: <Music2 size={15} className="text-current" /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white text-ink hover:bg-brand hover:text-white flex items-center justify-center transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={headingCls}>Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className={headingCls}>My Account</h4>
            <ul className="space-y-3 text-sm">
              {ACCOUNT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className={headingCls}>Address</h4>
            <ul className="space-y-4 text-sm text-ink/70">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="text-brand shrink-0 mt-0.5" />
                <span>{APP_CONFIG.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={17} className="text-brand shrink-0 mt-0.5" />
                <span>{APP_CONFIG.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={17} className="text-brand shrink-0 mt-0.5" />
                <a href={`mailto:${APP_CONFIG.email}`} className="hover:text-brand transition-colors">
                  {APP_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Install App */}
          <div>
            <h4 className={headingCls}>Install App</h4>
            <p className="text-sm text-ink/70 mb-4">Free on App Store &amp; Google Play</p>
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center h-11 px-5 rounded-lg bg-ink text-white text-sm font-medium">
                App Store
              </span>
              <span className="inline-flex items-center h-11 px-5 rounded-lg bg-ink text-white text-sm font-medium">
                Google Play
              </span>
            </div>
            <p className="font-serif text-xl font-semibold text-brand mt-6">{APP_CONFIG.phone}</p>
            <p className="text-xs text-ink/60">Call us any time</p>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-leaf text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>© 2026 EMBER. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="px-2.5 py-1 rounded bg-white/95 text-ink text-[11px] font-bold tracking-wide"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
