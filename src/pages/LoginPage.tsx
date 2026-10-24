import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    try { await login(email, password); nav("/"); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-10 max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-soft animate-slide">
      <h1 className="text-center text-2xl font-extrabold">Вход</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email"
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-900" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Пароль"
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-900" />
      {error && <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
      <Button type="submit" loading={busy} className="w-full">Войти</Button>
      <p className="text-center text-sm text-slate-600">
        Нет аккаунта? <Link to="/register" className="font-semibold text-slate-900 hover:underline">Регистрация</Link>
      </p>
    </form>
  );
}