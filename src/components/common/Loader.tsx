/**
 * Loader
 * Elegant animated spinner and placeholder skeleton for loading states.
 *
 * @param {'spinner' | 'skeleton'} type - render style
 * @param {string} text - optional message
 *
 * Used in: Shop page, ProductDetails, Checkout, Lazy states
 */

import React from 'react';

interface LoaderProps {
  type?: 'spinner' | 'skeleton';
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  type = 'spinner',
  text = 'Loading authentic European flavors...',
  className = '',
}) => {
  if (type === 'skeleton') {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className="h-48 bg-[#241838] rounded-xl w-full" />
        <div className="h-4 bg-[#241838] rounded w-3/4" />
        <div className="h-4 bg-[#241838] rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="relative w-12 h-12 mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#34254D] border-t-[#D4AF37] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
        </div>
      </div>
      {text && <p className="text-sm font-medium text-[#A99BC4]">{text}</p>}
    </div>
  );
};
