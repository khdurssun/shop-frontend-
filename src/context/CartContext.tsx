import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { cartApi } from "../api/endpoints";
import type { CartItem } from "../types";
import { useAuth } from "./AuthContext";

interface Ctx {
  items: CartItem[];
  loading: boolean;
  count: number;
  total: number;
  add: (productId: string, qty?: number) => Promise<void>;
  update: (productId: string, qty: number) => Promise<void>;
  remove: (productId: string) => Promise<void>;
  reload: () => Promise<void>;
}
const C = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = async () => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    try { setItems(await cartApi.list()); }
    finally { setLoading(false); }
  };

  useEffect(() => { void reload(); }, [user]);

  const add = async (productId: string, qty = 1) => setItems(await cartApi.add(productId, qty));
  const update = async (productId: string, qty: number) => setItems(await cartApi.update(productId, qty));
  const remove = async (productId: string) => setItems(await cartApi.remove(productId));

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, i) => s + (i.product?.price ?? 0) * i.qty, 0), [items]);

  return <C.Provider value={{ items, loading, count, total, add, update, remove, reload }}>{children}</C.Provider>;
}

export function useCart() {
  const c = useContext(C);
  if (!c) throw new Error("useCart outside provider");
  return c;
}