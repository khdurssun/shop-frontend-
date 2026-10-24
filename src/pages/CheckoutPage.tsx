import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ordersApi } from "../api/endpoints";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";
import { rub } from "../components/ProductCard";

export default function CheckoutPage() {
  const { items, total, reload } = useCart();
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      await ordersApi.create({ address, comment });
      await reload();
      nav("/orders");
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (items.length === 0) {
    return <div className="py-20 text-center text-slate-500">Корзина пуста</div>;
  }

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-4xl gap-6 md:grid-cols-[1fr_320px] animate-fade">
      <div className="space-y-5 rounded-2xl bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-extrabold">Оформление заказа</h1>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Адрес доставки</span>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} required
            placeholder="Город, улица, дом, квартира"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900" />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Комментарий <span className="text-slate-400">(необязательно)</span></span>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900" />
        </label>

        {error && <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
        <p className="text-xs text-slate-500">Оплата — заглушка: заказ создаётся со статусом <b>pending</b>.</p>
      </div>

      <aside className="sticky top-20 h-fit rounded-2xl bg-white p-5 shadow-soft">
        <h2 className="mb-3 text-lg font-bold">К оплате</h2>
        <div className="mb-4 space-y-1 text-sm text-slate-600">
          {items.map((i) => (
            <div key={i.productId} className="flex justify-between gap-2">
              <span className="truncate">{i.product?.title} × {i.qty}</span>
              <span className="shrink-0">{i.product ? rub(i.product.price * i.qty) : ""}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold">
          <span>Итого</span><span>{rub(total)}</span>
        </div>
        <Button type="submit" loading={busy} className="mt-4 w-full">Создать заказ</Button>
      </aside>
    </form>
  );
}