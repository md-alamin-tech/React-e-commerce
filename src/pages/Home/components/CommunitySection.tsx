/**
 * CommunitySection
 * Newsletter subscription card with olive branch motif and instant feedback.
 *
 * Used in: Home page bottom
 */

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export const CommunitySection: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      showToast('Thank you for joining the Belké Market family! Check your inbox for a 10% welcome coupon.', 'success');
      setEmail('');
    } else {
      showToast('Please enter a valid email address', 'warning');
    }
  };

  return (
    <section className="bg-[#FAF7F2] py-14 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#ECE4D5] rounded-3xl p-8 sm:p-12 border border-[#DDD3C2] overflow-hidden">
          {/* Decorative olive leaf background watermark */}
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
            <svg className="w-80 h-80 text-[#263620]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C60 30, 80 50, 100 50 C80 60, 60 80, 50 100 C40 80, 20 60, 0 50 C20 40, 40 20, 50 0 Z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#263620] mb-3">
              Join Our Community
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5850] mb-8 leading-relaxed">
              Be the first to know about our grand opening, fresh arrivals from Europe, traditional home recipes, and festive neighborhood tastings.
            </p>

            {submitted ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 size={16} />
                <span>You're on the list! Welcome code: WELCOME10</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-white border border-[#DDD6C8] rounded-full px-5 py-3 text-xs sm:text-sm text-[#263620] placeholder-[#9E988D] focus:outline-none focus:border-[#B88847] shadow-2xs"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-7 py-3 rounded-full bg-[#B88847] hover:bg-[#A37538] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-2xs cursor-pointer"
                >
                  <span>JOIN</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
