import Transaction from "../models/TransactionModel.js";
import Stock from "../models/StockModel.js";
import Product from "../models/ProductModel.js";
import mongoose from "mongoose";

export const getTransactionsByStock = async (req, res) => {
  try {
    var transactions = [];
    var promise;
    if (isNaN(req.params.id)) {
      const stock = await Stock.findById(req.params.id).populate("transactions");
      transactions = stock.transactions;
    } else {
      //Since SKU is number
      const product = await Product.findOne({ sku: parseInt(req.params.id) }).populate("stocks");
      for (const e of product.stocks) {
        const stock = await Stock.findById(e._id).populate("transactions");
        for (var t of stock.transactions) {
          t = t.toJSON();
          t._id = String(t._id);
          transactions.push(t);
        }
      }
    }

    const ITEM_PER_PAGE = 5;
    let lastPage = Math.round(transactions.length / ITEM_PER_PAGE);
    let currentPage = req.params.page;
    let start = ITEM_PER_PAGE * (currentPage - 1);
    let last = Math.min(start + ITEM_PER_PAGE, transactions.length);

    var json = { last: lastPage, transactions: transactions.slice(start, last) };

    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTransactionToStock = async (req, res) => {
  const transaction = new Transaction(req.body);

  transaction.date = Date.now();

  try {
    const addedTransaction = await transaction.save();
    var stock = await Stock.findOne({ _id: req.headers.stock_id });
    if (stock.initial_quantity - stock.sold_quantity >= transaction.quantity) {
      stock = await Stock.findOneAndUpdate({ _id: stock._id }, { $push: { transactions: transaction } });
      stock = await Stock.findOneAndUpdate({ _id: stock._id }, { sold_quantity: stock.sold_quantity + transaction.quantity });
    } else {
      //TODO change error message language
      throw new Error("Transaction quanitity exceed remaining stock quantity");
    }

    res.status(200).json(addedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    var parentStock = await Stock.findOne({ transactions: { $in: transaction } });
    const soldQuantity = parentStock.sold_quantity - transaction.quantity;
    parentStock = await Stock.findOneAndUpdate({ _id: parentStock._id }, { sold_quantity: soldQuantity });

    const deletedTransaction = await Transaction.deleteOne({ _id: transaction._id });
    res.status(200).json(deletedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
