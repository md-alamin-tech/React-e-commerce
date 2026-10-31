/**
 * AuthContext
 * Manages user authentication state, profile, stored delivery addresses,
 * and order history with localStorage persistence.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Address {
  id: string;
  isDefault?: boolean;
  name: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  variantName?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Ready for Pickup';
  shippingAddress: Address;
  paymentMethod: 'card' | 'cod';
  couponCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  orders: Order[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => boolean;
  register: (name: string, email: string, password?: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'date'>) => Order;
}

const AUTH_STORAGE_KEY = 'belke_market_user_session';

const INITIAL_DEMO_USER: User = {
  id: 'usr-belke-demo',
  name: 'Elena Kastrati',
  email: 'elena.k@example.com',
  phone: '(860) 555-4321',
  addresses: [
    {
      id: 'addr-1',
      isDefault: true,
      name: 'Elena Kastrati',
      street: '142 Main Street',
      apartment: 'Apt 3B',
      city: 'Southington',
      state: 'CT',
      zipCode: '06489',
      country: 'United States',
      phone: '(860) 555-4321',
    },
  ],
  orders: [
    {
      id: 'BLK-84920',
      date: '2026-10-18T14:32:00Z',
      items: [
        {
          id: 'item-1',
          productId: 'prod-ajvar',
          productName: 'Ajvar (Roasted Red Pepper Spread)',
          variantName: 'Mild - 550g Jar',
          price: 8.49,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'item-2',
          productId: 'prod-feta',
          productName: 'Feta Cheese (Traditional Brined)',
          variantName: '400g Tub in Brine',
          price: 9.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'item-3',
          productId: 'prod-baklava',
          productName: 'Artisan Walnut Baklava',
          variantName: 'Box of 6 pieces (350g)',
          price: 12.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
        },
      ],
      subtotal: 39.96,
      discount: 3.99,
      shipping: 5.99,
      tax: 2.53,
      total: 44.49,
      status: 'Delivered',
      shippingAddress: {
        id: 'addr-1',
        isDefault: true,
        name: 'Elena Kastrati',
        street: '142 Main Street',
        city: 'Southington',
        state: 'CT',
        zipCode: '06489',
        country: 'United States',
        phone: '(860) 555-4321',
      },
      paymentMethod: 'card',
      couponCode: 'WELCOME10',
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return INITIAL_DEMO_USER;
    } catch {
      return INITIAL_DEMO_USER;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // storage unavailable or full
    }
  }, [user]);

  const login = (email: string): boolean => {
    // If existing mock user matches email, use it; otherwise initialize
    const loggedUser: User = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      phone: '(860) 555-0199',
      addresses: user?.addresses || [],
      orders: user?.orders || [],
    };
    setUser(loggedUser);
    return true;
  };

  const register = (name: string, email: string): boolean => {
    const newUser: User = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      addresses: [],
      orders: [],
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addressData,
      id: 'addr-' + Date.now().toString(),
    };
    setUser((prev) => {
      if (!prev) return null;
      const existing = prev.addresses || [];
      const updated = newAddress.isDefault
        ? existing.map((a) => ({ ...a, isDefault: false }))
        : existing;
      return {
        ...prev,
        addresses: [...updated, newAddress],
      };
    });
  };

  const deleteAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.filter((a) => a.id !== id),
      };
    });
  };

  const setDefaultAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.map((a) => ({
          ...a,
          isDefault: a.id === id,
        })),
      };
    });
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'date'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: 'BLK-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toISOString(),
    };

    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        orders: [newOrder, ...prev.orders],
      };
    });

    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        createOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
