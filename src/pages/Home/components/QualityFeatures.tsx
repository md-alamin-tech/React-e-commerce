/**
 * QualityFeatures
 * Dark 4-up feature strip followed by "Where Quality Meet Excellent Service."
 * (photo with badge on the left, copy, two highlights and button on the right).
 *
 * Used in: Home page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ChefHat, Truck, Leaf, ThumbsUp, Star } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { BTN_GREEN, productImage } from '../homeData';

const FEATURES = [
  { icon: Award, title: 'Super Quality Food' },
  { icon: ChefHat, title: 'Original Recipes' },
  { icon: Truck, title: 'Quick Fast Delivery' },
  { icon: Leaf, title: '100% Fresh Foods' },
];

const DESC = 'A team of dreamers and best building unique interactive';

export const QualityFeatures: React.FC = () => (
  <section className="bg-cream pt-4 pb-16 lg:pb-24">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
      {/* Feature strip */}
      <div className="rounded-2xl bg-[#1b1b1b] px-6 sm:px-10 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map(({ icon: Icon, title }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="w-12 h-12 rounded-full bg-sun flex items-center justify-center shrink-0">
              <Icon size={22} className="text-ink" />
            </span>
            <div>
              <h4 className="font-serif text-lg font-semibold text-white">{title}</h4>
              <p className="text-sm text-white/60 mt-1 leading-snug">{DESC}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quality + service */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-16 lg:mt-24">
        <div className="relative">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <img
              src={productImage('prod-burek')}
              alt="Freshly baked specialty"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 left-6 sm:left-10 rounded-2xl bg-brand text-white px-6 py-4 shadow-xl">
            <p className="font-serif text-3xl font-bold leading-none">Family Owned</p>
            <p className="font-hand text-xl text-sun mt-1">fresh every day</p>
          </div>
        </div>

        <div>
          <SectionTitle
            label="About Our Food"
            center={false}
            title="Where Quality Meet Excellent Service."
          />
          <p className="text-ink/70 leading-relaxed mt-5">
            We hand-select high quality imported products and bake fresh each morning, so every
            meal on your table tastes like home. Traditional recipes, honest ingredients and a warm
            welcome for every family.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            {[
              { icon: ThumbsUp, title: 'Super Quality Food' },
              { icon: Star, title: 'Well Reputation' },
            ].map(({ icon: Icon, title }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-brand" />
                </span>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-ink">{title}</h4>
                  <p className="text-sm text-ink/60 mt-1 leading-snug">{DESC}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-9">
            <Link to="/about" className={BTN_GREEN}>
              <span>More About Us</span>
            </Link>
            <p className="font-serif text-xs uppercase tracking-widest text-ink/60 max-w-[200px]">
              Customer's experience is our highest priority
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
