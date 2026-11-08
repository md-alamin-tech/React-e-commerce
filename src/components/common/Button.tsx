/**
 * Button
 * Reusable button component supporting multiple aesthetic variants,
 * sizes, icons, and loading state.
 *
 * @param {'primary' | 'secondary' | 'dark' | 'outline' | 'ghost'} variant - visual style variant
 * @param {'sm' | 'md' | 'lg'} size - button size
 * @param {boolean} isLoading - whether to show spinner
 * @param {React.ReactNode} children - button label and content
 *
 * Used in: ProductCard, HeroSection, Cart, Checkout, Forms, Modals
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-wider';

  // All sizes share one height / padding so every button looks the same.
  const sizeClasses = {
    sm: 'h-12 px-8 text-xs rounded-full gap-2',
    md: 'h-12 px-8 text-xs rounded-full gap-2',
    lg: 'h-12 px-8 text-xs rounded-full gap-2',
  };

  const variantClasses = {
    // Warm olive gold / cognac bronze used in "VISIT US" and "EXPLORE ALL PRODUCTS ->"
    primary:
      'bg-brand hover:bg-brand-dark text-white shadow-sm hover:shadow-md active:scale-[0.98]',
    // Dark deep olive green used in "EXPLORE OUR PRODUCTS ->" and main CTAs
    dark:
      'bg-brand hover:bg-brand-dark text-white shadow-sm hover:shadow-md active:scale-[0.98]',
    // Outline bordered button used in "OUR STORY"
    outline:
      'border border-brand text-brand bg-transparent hover:bg-brand/5 active:scale-[0.98]',
    // Light secondary button
    secondary:
      'bg-[#EFEBE2] hover:bg-[#EFEBE2] text-ink active:scale-[0.98]',
    ghost:
      'text-ink hover:bg-black/5 bg-transparent active:scale-[0.98]',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
