import { Link } from "react-router-dom";
import { productsApi } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import { GridSkeleton } from "../components/Skeleton";
import Button from "../components/Button";

export default function HomePage() {
  const { data, loading } = useFetch(() => productsApi.list({ sort: "new", limit: 8 }), []);

  return (
    <div className="space-y-10 animate-fade">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-8 py-16 text-white shadow-lift">
        <div className="relative z-10 max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">Новая коллекция</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">
            Покупай с удовольствием
          </h1>
          <p className="mt-3 text-white/85">
            Быстрый каталог, удобная корзина, история заказов. Всё что нужно — в одном месте.
          </p>
          <Link to="/catalog" className="mt-6 inline-block"><Button className="!bg-white !text-slate-900 hover:!bg-slate-100">Смотреть каталог</Button></Link>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 right-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Новинки</h2>
          <Link to="/catalog" className="text-sm font-medium text-brand-600 hover:underline">Все товары →</Link>
        </div>
        {loading && <GridSkeleton count={8} />}
        {data && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {data.items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}