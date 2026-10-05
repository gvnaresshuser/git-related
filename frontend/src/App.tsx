import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./api/productApi.js";import ProductForm from "./components/products/ProductForm.js";

import type { Product, ProductInput } from "./types/product.types.js";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [showForm, setShowForm] = useState<boolean>(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (id: number): Promise<void> => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts((previous) =>
        previous.filter((product) => product.id !== id),
      );
    } catch {
      setError("Failed to delete product");
    }
  };
  // Load products
  const loadProducts = async (): Promise<void> => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add / Update Product
  const handleProductSaved = async (
    productData: ProductInput,
  ): Promise<void> => {
    try {
      if (editingProduct) {
        // UPDATE
        const updatedProduct = await updateProduct(
          editingProduct.id,
          productData,
        );

        setProducts((previous) =>
          previous.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product,
          ),
        );
      } else {
        // CREATE
        const newProduct = await createProduct(productData);

        setProducts((previous) => [newProduct, ...previous]);
      }

      setShowForm(false);
      setEditingProduct(null);
    } catch {
      setError("Failed to save product");
    }
  };

  // Edit button
  const handleEdit = (product: Product): void => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Cancel
  const handleCancel = (): void => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <h1 className="text-2xl font-bold">Product Inventory Management</h1>

          <p className="mt-1 text-sm text-slate-300">
            React + TypeScript + Express + PostgreSQL
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Heading */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-800">Products</h2>

              <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                {products.length}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Manage your product inventory
            </p>
          </div>

          {!showForm && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700"
            >
              + Add Product
            </button>
          )}
        </div>

        {/* Product Form */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onProductSaved={handleProductSaved}
            onCancel={handleCancel}
          />
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <p className="text-gray-500">Loading products...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Product Table */}
        {!loading && !error && (
          <div className="overflow-hidden rounded-xl bg-white shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {product.id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">
                          {product.name}
                        </div>

                        <div className="text-xs text-gray-500">
                          {product.description}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {product.stock}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="mr-3 text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
