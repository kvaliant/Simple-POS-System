import express from "express";

import { getTransactionsByStock, addTransactionToStock, deleteTransaction } from "../controllers/TransactionController.js";

const router = express.Router();

router.get("/transactions/:id/:page", getTransactionsByStock);
// router.get("/transactions/:id", getTransactionsByUserId);
router.post("/transaction", addTransactionToStock);
router.delete("/transaction/:id", deleteTransaction);

export default router;
