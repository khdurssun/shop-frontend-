export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;         // в рублях, целое
  imageUrl?: string;
  categoryId: string;
  stock: number;
  rating?: number;       // 0..5, опционально
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem {
  productId: string;
  product?: Product;
  qty: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  qty: number;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  address: string;
  createdAt: string;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  pages: number;
}

export interface ProductsQuery {
  category?: string;
  search?: string;
  sort?: "new" | "price_asc" | "price_desc" | "popular";
  page?: number;
  limit?: number;
}