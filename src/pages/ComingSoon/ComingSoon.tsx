/**
 * ComingSoon
 * Pre-launch landing page strictly implementing Section 5 of the mockup:
 * Scenic card hero, "Something Special Is Coming" notification signup,
 * 4 upcoming perks, and "Authentic Flavors. A Stronger Community." banner.
 *
 * Used in: /coming-soon route
 */

import React, { useState } from 'react';
import { PageBanner } from '../../components/layout/PageBanner';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import {
  Sparkles,
  Calendar,
  Tag,
  Package,
  Users,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function ComingSoon() {
  useDocumentTitle('Something Special Is Coming - Belké Market');
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      showToast('You are on our VIP guest list for the Southington Grand Opening!', 'success');
      setEmail('');
    } else {
      showToast('Please enter a valid email address', 'warning');
    }
  };

  const perks = [
    {
      icon: <Calendar className="w-5 h-5 text-brand" />,
      title: 'Grand Opening Updates',
      desc: 'Be the first to step through our doors for the inaugural ribbon cutting.',
    },
    {
      icon: <Tag className="w-5 h-5 text-brand" />,
      title: 'Special Offers',
      desc: 'Exclusive discounts and gift baskets reserved for early subscribers.',
    },
    {
      icon: <Package className="w-5 h-5 text-brand" />,
      title: 'New Products & Arrivals',
      desc: 'Direct shipments of artisan Balkan cheeses, cured meats, and sweets.',
    },
    {
      icon: <Users className="w-5 h-5 text-brand" />,
      title: 'Community Events',
      desc: 'Culinary tastings, cooking demonstrations, and festive gatherings.',
    },
  ];

  return (
    <div className="bg-cream pb-16">
      {/* 1. Hero Card: Something Special Is Coming */}
      <PageBanner
        title="Something Special Is Coming"
        subtitle="We're putting the finishing touches on Belké Market and can't wait to welcome you. Sign up to be the first to know about our grand opening, special events, and exclusive offers."
        image="/assets/aistudio/418DF6A8-A9E9-410B-B7B8-20AFB3597616_6d2f0595.png"
        imageAlt="Scenic Old World town with stone bridge and feast"
        align="center"
      >
        {/* Email form */}
        {isSubmitted ? (
          <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-leaf text-leaf text-xs font-semibold backdrop-blur-md border border-leaf/30">
            <CheckCircle2 size={18} />
            <span>You're registered for the grand opening announcement!</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full bg-white/95 backdrop-blur-sm rounded-full px-5 py-3 text-xs sm:text-sm text-ink placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-brand shadow-lg"
            />
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 bg-brand hover:bg-brand-dark text-white font-medium tracking-wide uppercase transition-colors shadow-lg cursor-pointer h-12 px-8 rounded-full font-serif text-sm"
            >
              <span>KEEP ME UPDATED</span>
              <ArrowRight size={13} />
            </button>
          </form>
        )}
      </PageBanner>

      {/* 2. Perks 4-Column Grid */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-black/10 flex flex-col items-center text-center shadow-2xs hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-cream border border-black/10 flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ink mb-2">
                {p.title}
              </h3>
              <p className="text-xs text-ink/60 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bottom Banner: Authentic Flavors. A Stronger Community. */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-black/10">
          <img
            src="/assets/aistudio/EA7AB6BA-A77D-4A0C-868C-F7B2BD7987DF_df31e837.png"
            alt="Culinary feast banner"
            className="w-full h-52 sm:h-60 object-cover object-center filter brightness-[0.6]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/20">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white tracking-tight drop-shadow-md">
              Authentic Flavors. A Stronger Community.
            </h3>
            <p className="text-xs sm:text-sm text-white/85 mt-2">
              Serving Southington, Connecticut & surrounding towns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
