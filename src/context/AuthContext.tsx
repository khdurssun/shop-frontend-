import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authApi } from "../api/endpoints";
import type { User } from "../types";

interface Ctx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
const C = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }
    authApi.me().then(setUser)
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const r = await authApi.login({ email, password });
    localStorage.setItem("token", r.token);
    setUser(r.user);
  };
  const register = async (name: string, email: string, password: string) => {
    const r = await authApi.register({ name, email, password });
    localStorage.setItem("token", r.token);
    setUser(r.user);
  };
  const logout = () => { localStorage.removeItem("token"); setUser(null); };

  return <C.Provider value={{ user, loading, login, register, logout }}>{children}</C.Provider>;
}

export function useAuth() {
  const c = useContext(C);
  if (!c) throw new Error("useAuth outside provider");
  return c;
}