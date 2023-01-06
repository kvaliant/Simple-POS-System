import express from "express";

import { getStocksBySKU, getStockById, addStockToSKU, updateStock, deleteStock } from "../controllers/StockController.js";

const router = express.Router();

router.get("/stocks/:sku/:page", getStocksBySKU);
router.get("/stock/:id", getStockById);
router.post("/stock", addStockToSKU);
router.patch("/stock/:id", updateStock);
router.delete("/stock/:id", deleteStock);

export default router;
