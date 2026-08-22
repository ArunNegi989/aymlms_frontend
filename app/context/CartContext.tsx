"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItem } from "@/app/types/Cart";

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isInCart: (id: string) => boolean;
  totalItems: number;
  totalPrice: number;
  totalOriginalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev; // no duplicate courses
      return [...prev, item];
    });
    setIsOpen(true); // open the drawer as feedback that it was added
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((v) => !v);
  const isInCart = (id: string) => items.some((i) => i.id === id);

  // Lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalItems = items.length;
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items]);
  const totalOriginalPrice = useMemo(
    () => items.reduce((sum, i) => sum + (i.originalPrice ?? i.price), 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addToCart,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        isInCart,
        totalItems,
        totalPrice,
        totalOriginalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}