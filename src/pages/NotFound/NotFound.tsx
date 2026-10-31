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
      <div className="max-w-md mx-auto bg-[#140C1F] p-10 rounded-3xl border border-[#2E2045] shadow-xs">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0B0710] flex items-center justify-center text-[#D4AF37]">
          <Compass size={32} />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
          404 ERROR
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#B57BFF] mb-2">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#A99BC4] mb-6">
          The page you are looking for may have been moved or does not exist. Let's guide you back to our delicious pantry.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#0B0710] text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            <span>Return Home</span>
            <ArrowRight size={13} />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#D4AF37] text-[#D4AF37] text-xs font-semibold tracking-wider uppercase hover:bg-[#D4AF37]/5 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
