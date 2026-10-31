/**
 * TopBanner
 * Topmost announcement bar with tagline, operating notes, and social media handles.
 *
 * Used in: Navbar / Main Layout header
 */

import React from 'react';
import { Instagram, Music2, Facebook } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';

export const TopBanner: React.FC = () => {
  return (
    <div className="bg-[#1C2717] text-[#EDE7DB] text-[11px] sm:text-xs py-2 px-4 border-b border-[#2D3F27]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-4 text-[#C4BDB0]">
          <span>✨ Bringing Albania & the Balkans to Southington, CT</span>
        </div>

        <div className="mx-auto md:mx-0 font-medium tracking-widest uppercase text-center text-[#F2ECE1]">
          {APP_CONFIG.topBanner}
        </div>

        <div className="hidden sm:flex items-center gap-3.5 text-[#EDE7DB]">
          <span className="text-[11px] text-[#A69F93] mr-1">Follow Us:</span>
          <a
            href={APP_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B88847] transition-colors p-0.5"
            aria-label="Instagram"
          >
            <Instagram size={14} />
          </a>
          <a
            href={APP_CONFIG.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B88847] transition-colors p-0.5"
            aria-label="TikTok"
          >
            <Music2 size={14} />
          </a>
          <a
            href={APP_CONFIG.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B88847] transition-colors p-0.5"
            aria-label="Facebook"
          >
            <Facebook size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};
