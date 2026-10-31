/**
 * Badge
 * Visual status tag used for product attributes, stock availability, and order status.
 *
 * @param {'default' | 'success' | 'warning' | 'sale' | 'accent'} variant - color theme
 * @param {React.ReactNode} children - badge text
 *
 * Used in: ProductCard, ProductDetails, Account (Orders), Cart
 */

import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'sale' | 'accent';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'sm',
  children,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full',
    md: 'text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full',
  };

  const variantClasses = {
    default: 'bg-[#EAE4D7] text-[#4A4742]',
    success: 'bg-[#E6F4EA] text-[#137333]',
    warning: 'bg-[#FEF7E0] text-[#B06000]',
    sale: 'bg-[#FCE8E6] text-[#C5221F]',
    accent: 'bg-[#F6EFE5] text-[#93692E] border border-[#E8DAC5]',
  };

  return (
    <span className={`inline-flex items-center font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
