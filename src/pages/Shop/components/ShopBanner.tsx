/**
 * ShopBanner
 * Top banner of the Shop page (shared PageBanner).
 *
 * Used in: Shop page
 */

import React from 'react';
import { PageBanner } from '../../../components/layout/PageBanner';

export const ShopBanner: React.FC = () => {
  return (
    <PageBanner
      title="Authentic Flavors from Near and Far"
      subtitle="Discover our carefully curated selection of European and Balkan groceries, fresh baked goods, and traditional favorites."
      image="/assets/aistudio/78A5BE01-2A4A-47F7-99E1-DD29923B8932_f5828261.png"
      align="center"
    />
  );
};
