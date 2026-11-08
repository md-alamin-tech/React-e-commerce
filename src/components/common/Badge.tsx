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
    default: 'bg-[#EFEBE2] text-ink/75',
    success: 'bg-leaf/10 text-leaf',
    warning: 'bg-sun/25 text-ink',
    sale: 'bg-brand/10 text-brand',
    accent: 'bg-[#EFEBE2] text-brand-dark border border-black/10',
  };

  return (
    <span className={`inline-flex items-center font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
