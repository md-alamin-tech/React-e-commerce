/**
 * App Constants & Helper Utilities
 * Contains site-wide configuration, discount codes, shipping fees, and storage keys.
 */

export const APP_CONFIG = {
  storeName: 'EMBER',
  tagline: 'Fresh • Fiery • Fast',
  topBanner: 'A LITTLE TASTE OF HOME, CLOSE TO HOME.',
  address: 'Southington, CT',
  phone: '(860) 555-0192',
  email: 'hello@emberfood.com',
  socials: {
    instagram: 'https://instagram.com/emberfood',
    facebook: 'https://facebook.com/emberfood',
    tiktok: 'https://tiktok.com/@emberfood',
  },
  shipping: {
    standardRate: 5.99,
    freeShippingThreshold: 50.0,
    expressRate: 14.99,
  },
  taxRate: 0.0635, // Connecticut standard sales tax
};

export const COUPONS: Record<string, { code: string; discountPercent: number; description: string }> = {
  WELCOME10: { code: 'WELCOME10', discountPercent: 10, description: '10% off your first Balkan feast' },
  EMBER15: { code: 'EMBER15', discountPercent: 15, description: '15% grand opening celebration discount' },
  BALKAN20: { code: 'BALKAN20', discountPercent: 20, description: '20% off on orders over $60' },
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
