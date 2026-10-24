import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const lc = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-1.5 text-sm font-medium transition ${isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`;

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white">S</span>
            Shop
          </Link>
          <form
            onSubmit={(e) => { e.preventDefault(); navigate(`/catalog?search=${encodeURIComponent(q)}`); }}
            className="hidden flex-1 md:block"
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Найти товар..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-slate-900 focus:bg-white"
            />
          </form>
          <nav className="ml-auto flex items-center gap-1">
            <NavLink to="/catalog" className={lc}>Каталог</NavLink>
            <NavLink to="/orders" className={lc}>Заказы</NavLink>
            <NavLink to="/cart" className={lc}>
              <span className="flex items-center gap-1">
                🛒 Корзина
                {count > 0 && (
                  <span className="rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">{count}</span>
                )}
              </span>
            </NavLink>
            {user ? (
              <div className="ml-2 flex items-center gap-2">
                <span className="hidden text-sm text-slate-600 sm:inline">{user.name}</span>
                <button onClick={logout} className="text-sm text-slate-500 hover:text-slate-900">Выйти</button>
              </div>
            ) : (
              <NavLink to="/login" className={lc}>Войти</NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8"><Outlet /></main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Shop · Красивый фронт для твоего бэка
      </footer>
    </div>
  );
}