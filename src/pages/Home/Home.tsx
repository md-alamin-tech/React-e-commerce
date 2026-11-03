/**
 * Home
 * Landing page, top to bottom: hero slider, popular food items, promo banners,
 * sponsors, today's offer band, popular fast foods, combo offer, dishes marquee,
 * quality features, special cards, countdown offer, testimonial, delivery banner, gallery.
 *
 * Used in: / route
 */

import React from 'react';
import { HeroSlider } from './components/HeroSlider';
import { PopularFoodItems } from './components/PopularFoodItems';
import { PromoBanners } from './components/PromoBanners';
import { SponsorsRow } from './components/SponsorsRow';
import { DayOfferBand } from './components/DayOfferBand';
import { PopularFastFoods } from './components/PopularFastFoods';
import { ComboOffer } from './components/ComboOffer';
import { DishesMarquee } from './components/DishesMarquee';
import { QualityFeatures } from './components/QualityFeatures';
import { SpecialCards } from './components/SpecialCards';
import { HotWingCountdown } from './components/HotWingCountdown';
import { Testimonial } from './components/Testimonial';
import { DeliveryChallenge } from './components/DeliveryChallenge';
import { FoodGallery } from './components/FoodGallery';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Home - Authentic European & Balkan Groceries');

  return (
    <div className="bg-cream text-ink font-sans overflow-x-clip">
      <HeroSlider />
      <PopularFoodItems />
      <PromoBanners />
      <SponsorsRow />
      <DayOfferBand />
      <PopularFastFoods />
      <ComboOffer />
      <DishesMarquee />
      <QualityFeatures />
      <SpecialCards />
      <HotWingCountdown />
      <Testimonial />
      <DeliveryChallenge />
      <FoodGallery />
    </div>
  );
}
