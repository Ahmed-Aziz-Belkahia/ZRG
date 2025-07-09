import React, { createContext, useState, useContext, useEffect } from 'react';
import { Script } from '../types';

interface CartItem extends Script {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (script: Script) => void;
  removeFromCart: (scriptId: string) => void;
  updateQuantity: (scriptId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  setIsCartOpen: (isOpen: boolean) => void;
  isCartOpen: boolean;
  isInCart: (scriptId: string) => boolean; // Add 'isInCart' to the context
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('zrg-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('zrg-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (script: Script) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.slug === script.slug);
      if (existingItem) {
        return prev.map((item) => 
          item.slug === script.slug 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...script, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (scriptSlug: string) => {
    setCart((prev) => prev.filter((script) => script.slug !== scriptSlug));
  };

  const updateQuantity = (scriptId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(scriptId);
      return;
    }
    
    setCart((prev) => 
      prev.map((item) => 
        item.id === scriptId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = cart.reduce(
    (total, item) => total + (item.discountPrice || item.price) * item.quantity, 
    0
  );

  const isInCart = (scriptSlug: string) => {
    return cart.some((script) => script.slug === scriptSlug);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        totalItems, 
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        isInCart // Add 'isInCart' to the context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};