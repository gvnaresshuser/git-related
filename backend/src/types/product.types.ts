export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
}

export interface UpdateProductRequest {
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
}