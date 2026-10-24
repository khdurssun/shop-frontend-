import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { rub } from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

export default function CartPage() {
  const { items, loading, total, count, update, remove } = useCart();
  const navigate = useNavigate();

  if (loading) return <div className="py-20 text-center text-slate-500">Загрузка корзины...</div>;
  if (items.length === 0) return <EmptyState title="Корзина пуста" description="Добавь что-нибудь из каталога" />;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_340px] animate-fade">
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.productId} className="flex gap-4 rounded-2xl bg-white p-3 shadow-soft">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
              {i.product?.imageUrl
                ? <img src={i.product.imageUrl} alt="" className="h-full w-full object-cover" />
                : null}
            </div>
            <div className="flex flex-1 flex-col">
              <Link to={`/product/${i.productId}`} className="font-medium leading-snug hover:underline">
                {i.product?.title ?? i.productId}
              </Link>
              <div className="text-sm text-slate-500">{i.product ? rub(i.product.price) : ""}</div>
              <div className="mt-auto flex items-center gap-2">
                <button onClick={() => update(i.productId, Math.max(1, i.qty - 1))}
                  className="h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50">−</button>
                <span className="w-8 text-center text-sm font-medium">{i.qty}</span>
                <button onClick={() => update(i.productId, i.qty + 1)}
                  className="h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50">+</button>
                <button onClick={() => remove(i.productId)}
                  className="ml-auto text-sm text-rose-600 hover:underline">Удалить</button>
              </div>
            </div>
            <div className="shrink-0 text-right text-sm font-semibold">
              {i.product ? rub(i.product.price * i.qty) : ""}
            </div>
          </div>
        ))}
      </div>

      <aside className="sticky top-20 h-fit rounded-2xl bg-white p-5 shadow-soft">
        <h2 className="mb-4 text-lg font-bold">Сводка</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Товаров</span><span>{count}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Доставка</span><span>бесплатно</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold">
            <span>Итого</span><span>{rub(total)}</span>
          </div>
        </div>
        <Button onClick={() => navigate("/checkout")} className="mt-5 w-full">Оформить заказ</Button>
      </aside>
    </div>
  );
}