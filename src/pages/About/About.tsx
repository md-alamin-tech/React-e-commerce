/**
 * About
 * Brand story page in the same style as the home page: photo banner, story block with
 * section title, dark four-up values strip and a photo call-to-action.
 *
 * Used in: /about route
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, HeartHandshake, Users, Award } from 'lucide-react';
import { PageBanner } from '../../components/layout/PageBanner';
import { SectionTitle } from '../Home/components/SectionTitle';
import { BTN_GREEN, BTN_RED, BG } from '../Home/homeData';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const VALUES = [
  {
    icon: Sparkles,
    title: 'Authentic Products',
    desc: 'Sourced directly from heritage Balkan and European producers who preserve traditional recipes.',
  },
  {
    icon: HeartHandshake,
    title: 'Family Focused',
    desc: 'Rooted in generational love, welcoming every family to gather around a warm, home-cooked meal.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'Proudly serving Southington and Connecticut, fostering cultural connection and neighborly hospitality.',
  },
  {
    icon: Award,
    title: 'European Tradition',
    desc: 'Honoring time-tested methods, from natural barrel-curing to slow fire-roasting.',
  },
];

export default function About() {
  useDocumentTitle('About Us - Belké Market Story & Values');
  const valuesRef = useRef<HTMLDivElement>(null);

  const scrollToValues = () => {
    valuesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-cream">
      {/* 1. Banner */}
      <PageBanner
        label="More than groceries..."
        title="Our Story"
        subtitle="It's our culture, our traditions, our memories."
        image="/assets/aistudio/about-banner.jpg"
        imageAlt="Burgers, tomatoes and fries on a dark table"
        align="left"
      />

      {/* 2. About Belké Market */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <img
                src={BG.shop}
                alt="Belké Market warm artisan grocery shop interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="text-left">
              <SectionTitle label="About Belké Market" center={false} title="Where Tradition Meets Your Table" />
              <div className="space-y-4 text-ink/70 leading-relaxed mt-5 mb-8">
                <p>
                  Belké Market was created with a simple mission: to bring authentic European and Balkan foods closer to home. We believe food connects generations, preserves culture, and brings communities together.
                </p>
                <p>
                  From everyday essentials to traditional favorites, we carefully select high-quality products that remind us of home and introduce new flavors to our neighbors.
                </p>
                <p>
                  Whether you are searching for authentic sheep milk feta in wooden barrels, smoky homemade ajvar, fresh spiral burek, or rich roasted Turkish coffee, our shelves are stocked with pride and care.
                </p>
              </div>

              <button type="button" onClick={scrollToValues} className={BTN_GREEN}>
                <span>Our Values</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Values strip */}
      <section ref={valuesRef} className="pb-16 lg:pb-24 scroll-mt-24">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-[#1b1b1b] px-6 sm:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-full bg-sun flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-ink" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white">{title}</h3>
                  <p className="text-sm text-white/60 mt-1 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Call to action */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="relative isolate overflow-hidden rounded-3xl min-h-[380px] flex items-center">
            <img
              src="/assets/aistudio/about-cta.jpg"
              alt="Double cheeseburger with chili peppers"
              className="absolute inset-0 -z-20 w-full h-full object-cover object-right"
              loading="lazy"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

            <div className="px-8 sm:px-14 py-12 max-w-xl">
              <p className="font-serif text-lg font-semibold text-sun tracking-wide">
                Visit us in Southington, CT
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold uppercase text-white leading-[1.1] mt-2">
                Good Food Brings People Together.
              </h2>
              <p className="text-white/80 leading-relaxed mt-4">
                Visit our store in Southington, CT or order online today.
              </p>
              <Link to="/shop" className={`${BTN_RED} mt-8`}>
                <span>Order Now</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
