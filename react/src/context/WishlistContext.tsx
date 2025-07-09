import React, { createContext, useState, useContext, useEffect } from 'react';
import { Script } from '../types';

interface WishlistContextType {
  wishlist: Script[];
  addToWishlist: (script: Script) => void;
  removeFromWishlist: (scriptId: string) => void;
  isInWishlist: (scriptId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Script[]>(() => {
    const savedWishlist = localStorage.getItem('zrg-wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('zrg-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (script: Script) => {
    setWishlist((prev) => {
      if (!prev.some((item) => item.slug === script.slug)) {
        return [...prev, script];
      }
      return prev;
    });
  };

  const removeFromWishlist = (scriptSlug: string) => {
    setWishlist((prev) => prev.filter((script) => script.slug !== scriptSlug));
  };

  const isInWishlist = (scriptSlug: string) => {
    return wishlist.some((script) => script.slug === scriptSlug);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};