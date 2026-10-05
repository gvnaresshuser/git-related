import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Product, ProductInput } from "../../types/product.types.js";

interface ProductFormProps {
  product?: Product | null;
  onProductSaved: (product: ProductInput) => Promise<void>;
  onCancel: () => void;
}

function ProductForm({ product, onProductSaved, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductInput>({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product ? Number(product.price) : 0,
    category: product?.category ?? "",
    stock: product?.stock ?? 0,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isEditMode = Boolean(product);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      await onProductSaved(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h2>

        <p className="text-sm text-gray-500">
          {isEditMode
            ? "Update the product details below"
            : "Enter the product details below"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          {/* Product Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter category"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter product description"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter price"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock || ""}
              onChange={handleChange}
              min="0"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter stock"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Update Product"
                : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
