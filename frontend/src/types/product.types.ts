export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
}