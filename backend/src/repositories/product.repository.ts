import { pool } from "../db/pool.js";
import {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "../types/product.types.js";

const TABLE_NAME = "products_git_advaitecs";

export const productRepository = {
  // Get all products
  async findAll(): Promise<Product[]> {
    const result = await pool.query(
      `SELECT *
       FROM ${TABLE_NAME}
       ORDER BY id DESC`
    );

    return result.rows;
  },

  // Get product by ID
  async findById(id: number): Promise<Product | null> {
    const result = await pool.query(
      `SELECT *
       FROM ${TABLE_NAME}
       WHERE id = $1`,
      [id]
    );

    return result.rows[0] ?? null;
  },

  // Create product
  async create(data: CreateProductRequest): Promise<Product> {
    const result = await pool.query(
      `INSERT INTO ${TABLE_NAME}
        (name, description, price, category, stock)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        data.name,
        data.description ?? null,
        data.price,
        data.category ?? null,
        data.stock ?? 0,
      ]
    );

    return result.rows[0];
  },

  // Update product
  async update(
    id: number,
    data: UpdateProductRequest
  ): Promise<Product | null> {
    const result = await pool.query(
      `UPDATE ${TABLE_NAME}
       SET
         name = $1,
         description = $2,
         price = $3,
         category = $4,
         stock = $5,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [
        data.name,
        data.description ?? null,
        data.price,
        data.category ?? null,
        data.stock ?? 0,
        id,
      ]
    );

    return result.rows[0] ?? null;
  },

  // Delete product
  async delete(id: number): Promise<Product | null> {
    const result = await pool.query(
      `DELETE FROM ${TABLE_NAME}
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    return result.rows[0] ?? null;
  },
};