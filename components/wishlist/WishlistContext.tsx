"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import type { ProductListItem } from "@/lib/products";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface WishlistState {
  items: ProductListItem[];
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: ProductListItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "HYDRATE"; items: ProductListItem[] }
  | { type: "CLEAR" };

interface WishlistContextValue {
  items: ProductListItem[];
  addItem: (item: ProductListItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

/* ------------------------------------------------------------------ */
/* Reducer                                                             */
/* ------------------------------------------------------------------ */

function wishlistReducer(
  state: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };

    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) return state; // Already in wishlist
      return { items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.id) };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "aavjo_wishlist_v1";

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: ProductListItem[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {
      // Corrupted storage — start fresh
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage quota exceeded or unavailable — fail silently
    }
  }, [state.items]);

  const addItem = useCallback((item: ProductListItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", id });
  }, []);

  const isInWishlist = useCallback(
    (id: string) => {
      return state.items.some((i) => i.id === id);
    },
    [state.items]
  );

  const clearWishlist = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
