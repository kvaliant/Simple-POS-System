import express from "express";

import { getProductBySKU, getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/ProductController.js";

const router = express.Router();

router.get("/product/:sku", getProductBySKU);
router.get("/products/:page", getProducts);
router.post("/product", addProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
