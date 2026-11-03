/**
 * Home page shared helpers: existing image paths and button styles.
 * Only images that already exist in the project are used (public/assets + product photos).
 */

import { PRODUCTS } from '../../data/products';

export const BG = {
  feast: '/assets/aistudio/418DF6A8-A9E9-410B-B7B8-20AFB3597616_6d2f0595.png',
  market: '/assets/aistudio/F2D2C2FE-6DDF-4915-ACF2-5627FCCF53C8_fd4723d5.png',
  spread: '/assets/aistudio/EA7AB6BA-A77D-4A0C-868C-F7B2BD7987DF_df31e837.png',
  shop: '/assets/aistudio/64702B2B-DAFA-4039-A870-C1923AC2C266_3aa407e6.png',
};

/** First photo of a catalog product (falls back to a hero image). */
export const productImage = (id: string, index = 0): string => {
  const product = PRODUCTS.find((p) => p.id === id);
  return product?.images[index] ?? product?.images[0] ?? BG.feast;
};

export const BTN_GREEN =
  'inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-leaf hover:bg-leaf-dark text-white font-serif font-medium tracking-wide uppercase text-sm transition-colors cursor-pointer';

export const BTN_RED =
  'inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-brand hover:bg-brand-dark text-white font-serif font-medium tracking-wide uppercase text-sm transition-colors cursor-pointer';
