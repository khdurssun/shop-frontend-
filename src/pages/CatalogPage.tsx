import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categoriesApi, productsApi } from "../api/endpoints";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import { GridSkeleton } from "../components/Skeleton";
import EmptyState from "../components/EmptyState";
import type { ProductsQuery } from "../types";

export default function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(params.get("search") ?? "");

  const category = params.get("category") ?? "";
  const search = params.get("search") ?? "";
  const sort = (params.get("sort") as ProductsQuery["sort"]) ?? "new";
  const page = Number(params.get("page") ?? 1);

  useEffect(() => setSearchInput(search), [search]);

  const { data: cats } = useFetch(() => categoriesApi.list(), []);
  const { data, loading, error } = useFetch(
    () => productsApi.list({ category, search, sort, page }),
    [category, search, sort, page]
  );

  const setParam = (k: string, v: string | number) => {
    const next = new URLSearchParams(params);
    if (v === "" || v === undefined) next.delete(k); else next.set(k, String(v));
    if (k !== "page") next.delete("page");
    setParams(next);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr] animate-fade">
      <aside className="space-y-5">
        <form
          onSubmit={(e) => { e.preventDefault(); setParam("search", searchInput); }}
          className="md:hidden"
        >
          <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Поиск..." className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        </form>

        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Категории</h3>
          <ul className="space-y-1">
            <li>
              <button onClick={() => setParam("category", "")}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${!category ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}>
                Все
              </button>
            </li>
            {cats?.map((c) => (
              <li key={c.id}>
                <button onClick={() => setParam("category", c.slug)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${category === c.slug ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}>
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Сортировка</h3>
          <select value={sort} onChange={(e) => setParam("sort", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
            <option value="new">Новые</option>
            <option value="popular">Популярные</option>
            <option value="price_asc">Цена ↑</option>
            <option value="price_desc">Цена ↓</option>
          </select>
        </div>
      </aside>

      <section>
        {loading && <GridSkeleton count={9} />}
        {error && <div className="rounded-xl bg-rose-50 p-4 text-rose-700">Ошибка: {error}</div>}
        {data && data.items.length === 0 && (
          <EmptyState title="Ничего не найдено" description="Попробуй изменить фильтры" />
        )}
        {data && data.items.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {data.items.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            {data.pages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  disabled={page <= 1}
                  onClick={() => setParam("page", page - 1)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-40">
                  Назад
                </button>
                <span className="text-sm text-slate-600">{page} / {data.pages}</span>
                <button
                  disabled={page >= data.pages}
                  onClick={() => setParam("page", page + 1)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-40">
                  Вперёд
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}