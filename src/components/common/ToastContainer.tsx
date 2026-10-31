/**
 * ToastContainer
 * Renders floating toast notifications on top right of the viewport.
 *
 * Used in: Layout wrapper, root application
 */

import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-[#D4AF37] shrink-0" />,
          info: <Info className="w-5 h-5 text-[#D4AF37] shrink-0" />,
        };

        const borders = {
          success: 'border-emerald-800 bg-[#0F2A1A]',
          error: 'border-rose-800 bg-[#2E1214]',
          warning: 'border-amber-800 bg-[#170F25]',
          info: 'border-[#2E2045] bg-[#0B0710]',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all transform animate-in fade-in slide-in-from-bottom-2 ${
              borders[toast.type]
            }`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <p className="text-xs font-bold uppercase tracking-wider text-[#F1EAFB] mb-0.5">
                  {toast.title}
                </p>
              )}
              <p className="text-sm text-[#F1EAFB] leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8D7FA8] hover:text-[#D4AF37] p-1 cursor-pointer"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
