import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { productsApi } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { rub } from "../components/ProductCard";

export default function ProductPage() {
  const { id = "" } = useParams();
  const { data: p, loading, error } = useFetch(() => productsApi.byId(id), [id]);
  const { add } = useCart();
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <div className="skeleton aspect-square rounded-3xl" />
        <div className="space-y-3">
          <div className="skeleton h-6 w-1/2" />
          <div className="skeleton h-8 w-1/3" />
          <div className="skeleton h-24 w-full" />
        </div>
      </div>
    );
  }
  if (error) return <div className="rounded-xl bg-rose-50 p-4 text-rose-700">Ошибка: {error}</div>;
  if (!p) return null;

  const out = p.stock <= 0;
  const handleAdd = async () => {
    setBusy(true);
    try { await add(p.id); setAdded(true); setTimeout(() => setAdded(false), 1500); }
    finally { setBusy(false); }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 animate-fade">
      <div className="relative overflow-hidden rounded-3xl bg-slate-100">
        <div className="aspect-square">
          {p.imageUrl
            ? <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover" />
            : <div className="flex h-full w-full items-center justify-center text-slate-400">нет фото</div>}
        </div>
        {p.isNew && <span className="absolute left-4 top-4"><Badge kind="new">NEW</Badge></span>}
      </div>
      <div className="space-y-5">
        <Link to="/catalog" className="text-sm text-slate-500 hover:text-slate-900">← Назад в каталог</Link>
        <h1 className="text-3xl font-extrabold tracking-tight">{p.title}</h1>
        <div className="text-3xl font-bold">{rub(p.price)}</div>
        <p className="whitespace-pre-line leading-relaxed text-slate-600">{p.description}</p>
        <div className="flex items-center gap-3 text-sm">
          <span className={out ? "text-rose-600 font-medium" : "text-emerald-600 font-medium"}>
            {out ? "Нет в наличии" : `В наличии: ${p.stock} шт.`}
          </span>
        </div>
        <Button onClick={handleAdd} loading={busy} disabled={out} className="!px-6 !py-3">
          {added ? "Добавлено ✓" : out ? "Нет в наличии" : "Добавить в корзину"}
        </Button>
      </div>
    </div>
  );
}