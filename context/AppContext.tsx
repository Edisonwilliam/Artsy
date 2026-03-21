"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { defaultCartItems, CartItem } from '@/lib/cart';

interface AppContextType {
  cartItems: CartItem[];
  cartCount: number;
  notificationCount: number;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  addToCart: (item?: Partial<CartItem>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  addNotification: () => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(defaultCartItems);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const addToCart = (item?: Partial<CartItem>) => {
    // If no item provided, just increment total count (mock behavior for simple clicks)
    if (!item || !item.id) {
        setCartItems(prev => {
            const first = prev[0];
            if (first) return prev.map((it, idx) => idx === 0 ? { ...it, quantity: it.quantity + 1 } : it);
            return prev;
        });
        return;
    }
    
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 } as CartItem];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(i => 
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    ));
  };

  const addNotification = () => {
    setNotificationCount(prev => prev + 1);
  };

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  return (
    <AppContext.Provider 
      value={{ 
        cartItems,
        cartCount, 
        notificationCount, 
        isSearchOpen, 
        setIsSearchOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        addNotification,
        clearNotifications
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
