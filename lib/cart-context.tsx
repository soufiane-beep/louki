"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { parsePrice } from "@/lib/money";
import { menuCategories } from "@/lib/menu-data";

const STORAGE_KEY = "louki:cart-lines";

function loadStoredLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Le prix stocké peut dater d'une ancienne carte : on le reprend toujours de la carte
    // actuelle, et on écarte les plats qui n'y figurent plus.
    return parsed.flatMap((l): CartLine[] => {
      if (
        !l ||
        typeof l.categorySlug !== "string" ||
        typeof l.itemName !== "string" ||
        typeof l.quantity !== "number" ||
        !Number.isInteger(l.quantity) ||
        l.quantity <= 0
      ) {
        return [];
      }
      const item = menuCategories
        .find((c) => c.slug === l.categorySlug)
        ?.items.find((i) => i.name === l.itemName);
      if (!item) return [];
      return [{ categorySlug: l.categorySlug, itemName: l.itemName, price: item.price, quantity: l.quantity }];
    });
  } catch {
    return [];
  }
}

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
}

const lineKey = (categorySlug: string, itemName: string) => `${categorySlug}::${itemName}`;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  // State (et non ref) : l'effet de sauvegarde ne doit jamais tourner avant la lecture du
  // stockage, sinon il l'écrase avec le panier vide initial.
  const [hasHydrated, setHasHydrated] = useState(false);

  // Le contenu stocké n'est lu qu'après montage (localStorage indisponible en SSR).
  useEffect(() => {
    setLines(loadStoredLines());
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Stockage indisponible (navigation privée, quota) : la persistance est une
      // simple aide UX, on échoue silencieusement.
    }
  }, [lines, hasHydrated]);

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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
