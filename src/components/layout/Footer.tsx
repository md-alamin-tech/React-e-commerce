/**
 * Footer
 * Site footer matching the exact Belké Market mockup structure:
 * brand logo, quick links, contact info, cursive script slogan, and legal links.
 *
 * Used in: Layout wrapper
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Instagram, Facebook, Music2 } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07040C] pt-14 pb-8 text-[#E6DFCF]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Column 1: Brand & Emblem */}
          <div className="flex flex-col items-start space-y-4">
            <Link to="/" className="flex flex-col items-start group">
              <svg
                className="w-10 h-5 text-[#F5ECD7]"
                viewBox="0 0 100 40"
                fill="currentColor"
              >
                <path d="M50 35 C40 25, 20 28, 5 20 C22 15, 38 18, 50 35 Z" opacity="0.9" />
                <path d="M50 35 C60 25, 80 28, 95 20 C78 15, 62 18, 50 35 Z" opacity="0.9" />
                <circle cx="50" cy="18" r="4" fill="#D4AF37" />
              </svg>
              <span className="font-serif text-2xl font-bold tracking-widest text-[#F5ECD7] uppercase mt-1">
                BELKÉ
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#B0A99C] uppercase font-semibold">
                MARKET
              </span>
            </Link>
            <p className="text-xs text-[#B0A99C] leading-relaxed max-w-xs">
              Specialty grocery store bringing the warmest flavors and traditions of Albania and Europe to our local community.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5ECD7] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D0C9BA]">
              <li>
                <Link to="/" className="hover:text-[#D4AF37] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#D4AF37] transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D4AF37] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="hover:text-[#D4AF37] transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/coming-soon" className="hover:text-[#D4AF37] transition-colors">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5ECD7] mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-xs text-[#D0C9BA]">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{APP_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-[#D4AF37] shrink-0" />
                <a
                  href={`mailto:${APP_CONFIG.email}`}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {APP_CONFIG.email}
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3.5 mt-4 text-[#F5ECD7]">
              <a
                href={APP_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1E1430] hover:bg-[#D4AF37] hover:text-[#0B0710] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={APP_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1E1430] hover:bg-[#D4AF37] hover:text-[#0B0710] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href={APP_CONFIG.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1E1430] hover:bg-[#D4AF37] hover:text-[#0B0710] flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <Music2 size={15} />
              </a>
            </div>
          </div>

          {/* Column 4: Script Slogan */}
          <div className="flex flex-col justify-center items-start md:items-end">
            <div className="text-left md:text-right">
              <span className="font-serif text-lg text-[#F5ECD7] block">
                A little taste of home,
              </span>
              <span className="font-script text-3xl sm:text-4xl text-[#D4AF37] block mt-1">
                close to home.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#B0A99C] gap-3">
          <p>© 2026 Belké Market. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/about" className="hover:text-[#D4AF37] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
