import { ordersApi } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import { rub } from "../components/ProductCard";

const statusLabel: Record<string, string> = {
  pending: "Ожидает оплаты",
  paid: "Оплачен",
  shipped: "Отправлен",
  cancelled: "Отменён",
};

export default function OrdersPage() {
  const { data, loading, error } = useFetch(() => ordersApi.list(), []);

  if (loading) return <div className="py-20 text-center text-slate-500">Загрузка...</div>;
  if (error) return <div className="rounded-xl bg-rose-50 p-4 text-rose-700">Ошибка: {error}</div>;
  if (!data || data.length === 0) {
    return <EmptyState title="Заказов пока нет" description="Оформи первый заказ — он появится здесь" />;
  }

  return (
    <div className="space-y-4 animate-fade">
      <h1 className="text-2xl font-extrabold">Мои заказы</h1>
      {data.map((o) => (
        <div key={o.id} className="rounded-2xl bg-white p-5 shadow-soft">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-slate-500">
              Заказ <b className="text-slate-800">#{o.id}</b> · {new Date(o.createdAt).toLocaleString("ru-RU")}
            </div>
            <Badge kind={o.status}>{statusLabel[o.status] ?? o.status}</Badge>
          </div>
          <div className="space-y-1 text-sm">
            {o.items.map((it) => (
              <div key={it.productId} className="flex justify-between">
                <span className="text-slate-700">{it.title} × {it.qty}</span>
                <span className="text-slate-600">{rub(it.price * it.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-slate-100 pt-3">
            <span className="text-sm text-slate-500">{o.address}</span>
            <b>{rub(o.total)}</b>
          </div>
        </div>
      ))}
    </div>
  );
}