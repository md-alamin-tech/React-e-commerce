/**
 * Home
 * Main landing page strictly implementing the Belké Market layout:
 * HeroSection, ValuePillars, CategoryGrid, StorySection, FeaturedProducts, CommunitySection.
 *
 * Used in: / route
 */

import React from 'react';
import { HeroSection } from './components/HeroSection';
import { ValuePillars } from './components/ValuePillars';
import { CategoryGrid } from './components/CategoryGrid';
import { StorySection } from './components/StorySection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CommunitySection } from './components/CommunitySection';
import { Reveal } from '../../components/effects/Reveal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Home - Authentic European & Balkan Groceries');

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <Reveal>
        <ValuePillars />
      </Reveal>
      <Reveal>
        <CategoryGrid />
      </Reveal>
      <Reveal>
        <StorySection />
      </Reveal>
      <Reveal>
        <FeaturedProducts />
      </Reveal>
      <Reveal>
        <CommunitySection />
      </Reveal>
    </div>
  );
}
