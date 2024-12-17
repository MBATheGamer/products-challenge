import { Router } from "express";
import * as products from "./controller/products";

export const routes = (router: Router) => {
  router.get("/api/products", products.getAll);
  router.get("/api/products/:id", products.getById);
  router.get("/api/products/categories/:category", products.getByCategory);
  router.get("/api/products/search", products.search);
};
