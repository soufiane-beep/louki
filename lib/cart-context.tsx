"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { parsePrice } from "@/lib/money";

export interface CartLine {
  categorySlug: string;
  itemName: string;
  price: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  total: number;
  addItem: (categorySlug: string, itemName: string, price: string) => void;
  removeItem: (categorySlug: string, itemName: string) => void;
  setQuantity: (categorySlug: string, itemName: string, quantity: number) => void;
  quantityOf: (categorySlug: string, itemName: string) => number;
  clearCart: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  isSidesModalOpen: boolean;
  openSidesModal: () => void;
  closeSidesModal: () => void;
}

const lineKey = (categorySlug: string, itemName: string) => `${categorySlug}::${itemName}`;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSidesModalOpen, setSidesModalOpen] = useState(false);

  const addItem = (categorySlug: string, itemName: string, price: string) => {
    setLines((prev) => {
      const key = lineKey(categorySlug, itemName);
      const existing = prev.find((l) => lineKey(l.categorySlug, l.itemName) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l.categorySlug, l.itemName) === key ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...prev, { categorySlug, itemName, price, quantity: 1 }];
    });
  };

  const removeItem = (categorySlug: string, itemName: string) => {
    const key = lineKey(categorySlug, itemName);
    setLines((prev) => prev.filter((l) => lineKey(l.categorySlug, l.itemName) !== key));
  };

  const setQuantity = (categorySlug: string, itemName: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(categorySlug, itemName);
      return;
    }
    const key = lineKey(categorySlug, itemName);
    setLines((prev) =>
      prev.map((l) => (lineKey(l.categorySlug, l.itemName) === key ? { ...l, quantity } : l))
    );
  };

  const quantityOf = (categorySlug: string, itemName: string) => {
    const key = lineKey(categorySlug, itemName);
    return lines.find((l) => lineKey(l.categorySlug, l.itemName) === key)?.quantity ?? 0;
  };

  const clearCart = () => setLines([]);

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const total = useMemo(
    () => lines.reduce((sum, l) => sum + parsePrice(l.price) * l.quantity, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    itemCount,
    total,
    addItem,
    removeItem,
    setQuantity,
    quantityOf,
    clearCart,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    toggleDrawer: () => setDrawerOpen((v) => !v),
    isSidesModalOpen,
    openSidesModal: () => setSidesModalOpen(true),
    closeSidesModal: () => setSidesModalOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
