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
    <div className="bg-[#FAF7F2] py-24 px-4 text-center">
      <div className="max-w-md mx-auto bg-white p-10 rounded-3xl border border-[#E8DAC5] shadow-xs">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#B88847]">
          <Compass size={32} />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#B88847] block mb-1">
          404 ERROR
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#263620] mb-2">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#7C776E] mb-6">
          The page you are looking for may have been moved or does not exist. Let's guide you back to our delicious pantry.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#263620] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            <span>Return Home</span>
            <ArrowRight size={13} />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#263620] text-[#263620] text-xs font-semibold tracking-wider uppercase hover:bg-[#263620]/5 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
