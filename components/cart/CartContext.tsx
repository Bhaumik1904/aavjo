"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useState,
} from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface CartLineItem {
  /** Unique key: `${productId}_${size}` */
  key: string;
  productId: string;
  name: string;
  slug: string;
  /** Price in paise */
  price: number;
  imageUrl: string | null;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartLineItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartLineItem }
  | { type: "REMOVE_ITEM"; key: string }
  | { type: "UPDATE_QTY"; key: string; quantity: number }
  | { type: "HYDRATE"; items: CartLineItem[] }
  | { type: "CLEAR" };

interface CartContextValue {
  items: CartLineItem[];
  itemCount: number;
  subtotalPaise: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartLineItem, "key">) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, quantity: number) => void;
  clearCart: () => void;
}

/* ------------------------------------------------------------------ */
/* Reducer                                                             */
/* ------------------------------------------------------------------ */

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };

    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.key === action.payload.key);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.key === action.payload.key
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.key !== action.key) };

    case "UPDATE_QTY": {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.key !== action.key) };
      }
      return {
        items: state.items.map((i) =>
          i.key === action.key ? { ...i, quantity: action.quantity } : i
        ),
      };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "aavjo_cart_v1";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CartLineItem[] = JSON.parse(stored);
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

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (item: Omit<CartLineItem, "key">) => {
      const key = `${item.productId}_${item.size}`;
      dispatch({ type: "ADD_ITEM", payload: { ...item, key } });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((key: string) => {
    dispatch({ type: "REMOVE_ITEM", key });
  }, []);

  const updateQty = useCallback((key: string, quantity: number) => {
    dispatch({ type: "UPDATE_QTY", key, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotalPaise = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount,
        subtotalPaise,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
