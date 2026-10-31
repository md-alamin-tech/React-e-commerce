/**
 * NotFound
 * 404 error page displayed when route does not match any known paths.
 *
 * Used in: /* catch-all route
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Button } from '../../components/common/Button';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
  useDocumentTitle('Page Not Found - Belké Market');

  return (
    <div className="bg-[#0B0710] py-24 px-4 text-center">
      <div className="max-w-md mx-auto bg-[#140C1F] p-10 rounded-[10px] border border-[#2E2045] shadow-xs">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0B0710] flex items-center justify-center text-[#D4AF37]">
          <Compass size={32} />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#F5ECD7] mb-2">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#B0A99C] mb-6">
          The page you are looking for may have been moved or does not exist. Let's guide you back to our delicious pantry.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0B0710] font-semibold tracking-wider uppercase transition-colors h-12 px-8 rounded-full text-xs"
          >
            <span>Return Home</span>
            <ArrowRight size={13} />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center border border-[#D4AF37] text-[#D4AF37] font-semibold tracking-wider uppercase hover:bg-[#D4AF37]/5 transition-colors h-12 px-8 rounded-full text-xs"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
