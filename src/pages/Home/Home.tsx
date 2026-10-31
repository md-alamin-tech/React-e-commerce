/**
 * Home
 * Main landing page strictly implementing the Belké Market layout:
 * HeroSection, ValuePillars, CategoryGrid, StorySection, FeaturedProducts, CommunitySection.
 * Featured Products is pinned while the next section slides over it.
 *
 * Used in: / route
 */

import React, { useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { ValuePillars } from './components/ValuePillars';
import { CategoryGrid } from './components/CategoryGrid';
import { StorySection } from './components/StorySection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CommunitySection } from './components/CommunitySection';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useStackedSections } from '../../hooks/useStackedSections';

export default function Home() {
  useDocumentTitle('Home - Authentic European & Balkan Groceries');
  const sectionsRef = useRef<HTMLDivElement>(null);
  useStackedSections(sectionsRef);

  return (
    <div id="sections" ref={sectionsRef} className="flex flex-col w-full">
      <div className="page-section bg-[#0B0710]">
        <HeroSection />
      </div>
      <div className="page-section">
        <ValuePillars />
      </div>
      <div className="page-section">
        <CategoryGrid />
      </div>
      <div className="page-section">
        <StorySection />
      </div>
      <div className="page-section" data-stack>
        <FeaturedProducts />
      </div>
      <div className="page-section">
        <CommunitySection />
      </div>
    </div>
  );
}
