/**
 * CartContext
 * Full shopping cart management with quantities, variants, promo coupon support,
 * shipping calculation, tax calculation, and localStorage persistence.
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product } from '../data/products';
import { APP_CONFIG, COUPONS } from '../utils/constants';
import { useToast } from './ToastContext';

export interface CartItem {
  id: string; // unique combination of product id + variant id
  productId: string;
  name: string;
  slug: string;
  variantId?: string;
  variantName?: string;
  price: number;
  quantity: number;
  image: string;
  origin: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, variantId?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  discountPercent: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  shipping: number;
  isFreeShipping: boolean;
  freeShippingRemaining: number;
  tax: number;
  total: number;
}

const CART_STORAGE_KEY = 'belke_market_cart';
const COUPON_STORAGE_KEY = 'belke_market_coupon';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items]);

  useEffect(() => {
    try {
      if (couponCode) {
        localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // storage unavailable
    }
  }, [couponCode]);

  const addToCart = (product: Product, quantity = 1, variantId?: string) => {
    // Determine variant or default
    const selectedVariant = variantId
      ? product.variants.find((v) => v.id === variantId)
      : product.variants[0];

    const price = selectedVariant ? selectedVariant.price : product.price;
    const variantName = selectedVariant ? selectedVariant.name : undefined;
    const cartItemId = `${product.id}-${selectedVariant?.id || 'default'}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          variantId: selectedVariant?.id,
          variantName,
          price,
          quantity,
          image: product.images[0] || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
          origin: product.origin,
        },
      ];
    });

    showToast(`Added "${product.name}" to your cart!`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      showToast(`Removed "${item.name}" from cart`, 'info');
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyCoupon = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    if (COUPONS[upper]) {
      setCouponCode(upper);
      showToast(`Coupon "${upper}" applied (${COUPONS[upper].discountPercent}% off)!`, 'success');
      return true;
    } else {
      showToast(`Invalid coupon code "${code}". Try WELCOME10 or EMBER15`, 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    showToast('Coupon code removed', 'info');
  };

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const discountPercent = useMemo(() => {
    return couponCode && COUPONS[couponCode] ? COUPONS[couponCode].discountPercent : 0;
  }, [couponCode]);

  const discount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const isFreeShipping = subtotal >= APP_CONFIG.shipping.freeShippingThreshold || items.length === 0;

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return isFreeShipping ? 0 : APP_CONFIG.shipping.standardRate;
  }, [items.length, isFreeShipping]);

  const freeShippingRemaining = Math.max(0, APP_CONFIG.shipping.freeShippingThreshold - subtotal);

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = items.length === 0 ? 0 : taxableAmount * APP_CONFIG.taxRate;
  const total = items.length === 0 ? 0 : taxableAmount + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        discountPercent,
        couponCode,
        applyCoupon,
        removeCoupon,
        shipping,
        isFreeShipping,
        freeShippingRemaining,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
