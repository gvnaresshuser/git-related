import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: env.frontendUrl,
  })
);

app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Product CRUD API is running",
    environment: env.nodeEnv,
  });
});

// Product routes
app.use("/api/products", productRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(env.port, () => {
  console.log(`
========================================
 Product CRUD API
========================================
 Environment : ${env.nodeEnv}
 Port        : ${env.port}
 URL         : http://localhost:${env.port}
 Products    : http://localhost:${env.port}/api/products
========================================
  `);
});