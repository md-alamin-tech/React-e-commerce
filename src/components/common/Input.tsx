/**
 * Input
 * Form input field with label, error text, helper text, and optional leading/trailing icons.
 *
 * @param {string} label - input label above the field
 * @param {string} error - error message to display in red
 * @param {string} helper - helper text below input
 * @param {React.ReactNode} leftIcon - icon inside input on left
 * @param {React.ReactNode} rightIcon - icon inside input on right
 *
 * Used in: Checkout shipping form, Login, Register, Contact form, Search bar
 */

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-ink/75 mb-1.5"
          >
            {label}
            {props.required && <span className="text-[#FB923C] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-ink/60">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-white border rounded-2xl px-3.5 py-2.5 text-sm text-ink placeholder-ink/40 focus:outline-none transition-colors duration-150 ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-400'
                : 'border-black/10 focus:border-brand focus:ring-1 focus:ring-brand'
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 pointer-events-none text-ink/60">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-brand mt-1 font-medium">{error}</p>}
        {!error && helper && <p className="text-xs text-ink/60 mt-1">{helper}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
