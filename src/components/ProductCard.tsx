import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export function rub(n: number) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);
}

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [busy, setBusy] = useState(false);
  const out = product.stock <= 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (out) return;
    setBusy(true);
    try { await add(product.id); } finally { setBusy(false); }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col rounded-2xl bg-white p-3 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
        {product.imageUrl
          ? <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          : <div className="flex h-full w-full items-center justify-center text-slate-400">нет фото</div>}
        {product.isNew && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            New
          </span>
        )}
        {out && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-sm font-semibold text-slate-700">
            Нет в наличии
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-slate-800">{product.title}</h3>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base font-bold">{rub(product.price)}</span>
          <button
            onClick={handleAdd}
            disabled={out || busy}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {busy ? "..." : "В корзину"}
          </button>
        </div>
      </div>
    </Link>
  );
}