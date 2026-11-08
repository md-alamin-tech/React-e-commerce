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
    <div className="bg-cream py-24 px-4 text-center">
      <div className="max-w-md mx-auto bg-white p-10 rounded-2xl border border-black/10 shadow-xs">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center text-brand">
          <Compass size={32} />
        </div>
        <h1 className="font-serif text-3xl font-bold text-ink mb-2">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-ink/60 mb-6">
          The page you are looking for may have been moved or does not exist. Let's guide you back to our delicious pantry.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-brand text-white font-medium tracking-wide uppercase transition-colors h-12 px-8 rounded-full font-serif text-sm"
          >
            <span>Return Home</span>
            <ArrowRight size={13} />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center border border-brand text-brand font-medium tracking-wide uppercase hover:bg-brand/5 transition-colors h-12 px-8 rounded-full font-serif text-sm"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
