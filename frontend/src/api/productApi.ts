import { api } from "./axios.js";
import type {
  Product,
  ProductInput,
  ProductResponse,
  ProductsResponse,
} from "../types/product.types.js";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>("/products");

  return response.data.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<ProductResponse>(`/products/${id}`);

  return response.data.data;
};

export const createProduct = async (
  product: ProductInput,
): Promise<Product> => {
  const response = await api.post<ProductResponse>("/products", product);

  return response.data.data;
};

export const updateProduct = async (
  id: number,
  product: ProductInput,
): Promise<Product> => {
  const response = await api.put<ProductResponse>(
    `/products/${id}`,
    product,
  );

  return response.data.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};