/**
 * Modal
 * Accessible modal dialog with backdrop, smooth transitions, and keyboard escape support.
 *
 * @param {boolean} isOpen - controls modal visibility
 * @param {Function} onClose - triggered when clicking backdrop or close button
 * @param {string} title - optional modal header title
 * @param {React.ReactNode} children - modal body content
 *
 * Used in: QuickViewModal, RecipeModal, AddressFormModal
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  maxWidth = 'lg',
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-[#0B0710] rounded-2xl shadow-2xl border border-[#2E2045] z-10 overflow-hidden transform transition-all my-8`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2E2045] bg-[#1B1229]">
          {title ? (
            <h3 className="text-lg font-serif font-bold text-[#B57BFF]">{title}</h3>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#A99BC4] hover:text-[#D4AF37] hover:bg-[#2A1D3F] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
