/**
 * About
 * FoodKing-style brand page: photo banner, quality intro, delivery band, hot items, specials,
 * deal slider, chefs, serve steps, testimonial, gallery and a photo call-to-action.
 *
 * Used in: /about route
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PageBanner } from '../../components/layout/PageBanner';
import { BTN_RED } from '../Home/homeData';
import {
  QualityIntro,
  DeliveryBand,
  HotItems,
  SpecialPair,
  DealSlider,
  Chefs,
  ServeSteps,
} from './components/AboutSections';
import { DishesMarquee } from '../Home/components/DishesMarquee';
import { Testimonial } from '../Home/components/Testimonial';
import { FoodGallery } from '../Home/components/FoodGallery';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function About() {
  useDocumentTitle('About Us - Belké Market Story & Values');
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

      <QualityIntro />
      <DeliveryBand />
      <HotItems />
      <SpecialPair />
      <DishesMarquee />
      <DealSlider />
      <Chefs />
      <ServeSteps />
      <Testimonial />
      <FoodGallery />

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
