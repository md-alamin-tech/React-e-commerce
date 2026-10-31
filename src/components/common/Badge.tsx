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
    default: 'bg-[#2A1D3F] text-[#D6CDE6]',
    success: 'bg-[#0F2A1A] text-[#6EE7A0]',
    warning: 'bg-[#2B220D] text-[#FBBF24]',
    sale: 'bg-[#2E1214] text-[#F87171]',
    accent: 'bg-[#1B1229] text-[#B8962E] border border-[#2E2045]',
  };

  return (
    <span className={`inline-flex items-center font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
