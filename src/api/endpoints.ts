import { request } from "./client";
import type {
  AuthResponse, CartItem, Category, Order, Product,
  ProductsQuery, ProductsResponse, User
} from "../types";

function qs(obj: object): string {
  const p = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== "" && v !== null) p.set(k, String(v));
  });
  const s = p.toString();
  return s ? `?${s}` : "";
}

export const authApi = {
  register: (b: { name: string; email: string; password: string }) =>
    request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(b) }),
  login: (b: { email: string; password: string }) =>
    request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(b) }),
  me: () => request<User>("/auth/me"),
};

export const categoriesApi = {
  list: () => request<Category[]>("/categories"),
};

export const productsApi = {
  list: (q: ProductsQuery) => request<ProductsResponse>(`/products${qs(q)}`),
  byId: (id: string) => request<Product>(`/products/${id}`),
};

export const cartApi = {
  list: () => request<CartItem[]>("/cart"),
  add: (productId: string, qty = 1) =>
    request<CartItem[]>("/cart", { method: "POST", body: JSON.stringify({ productId, qty }) }),
  update: (productId: string, qty: number) =>
    request<CartItem[]>(`/cart/${productId}`, { method: "PATCH", body: JSON.stringify({ qty }) }),
  remove: (productId: string) =>
    request<CartItem[]>(`/cart/${productId}`, { method: "DELETE" }),
};

export const ordersApi = {
  create: (b: { address: string; comment?: string }) =>
    request<Order>("/orders", { method: "POST", body: JSON.stringify(b) }),
  list: () => request<Order[]>("/orders"),
  byId: (id: string) => request<Order>(`/orders/${id}`),
};