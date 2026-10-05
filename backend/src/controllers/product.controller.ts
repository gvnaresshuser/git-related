import { Request, Response } from "express";
import { productRepository } from "../repositories/product.repository.js";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "../types/product.types.js";

// GET /api/products
export const getProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await productRepository.findAll();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// GET /api/products/:id
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });

      return;
    }

    const product = await productRepository.findById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

// POST /api/products
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data: CreateProductRequest = req.body;

    if (!data.name || data.price === undefined) {
      res.status(400).json({
        success: false,
        message: "Name and price are required",
      });

      return;
    }

    if (Number(data.price) < 0) {
      res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });

      return;
    }

    const product = await productRepository.create({
      ...data,
      price: Number(data.price),
      stock: data.stock !== undefined ? Number(data.stock) : 0,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

// PUT /api/products/:id
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });

      return;
    }

    const data: UpdateProductRequest = req.body;

    if (!data.name || data.price === undefined) {
      res.status(400).json({
        success: false,
        message: "Name and price are required",
      });

      return;
    }

    if (Number(data.price) < 0) {
      res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });

      return;
    }

    const product = await productRepository.update(id, {
      ...data,
      price: Number(data.price),
      stock: data.stock !== undefined ? Number(data.stock) : 0,
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error updating product:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });

      return;
    }

    const product = await productRepository.delete(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error deleting product:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};