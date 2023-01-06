import Stock from "../models/StockModel.js";
import Product from "../models/ProductModel.js";

export const getStocksBySKU = async (req, res) => {
  try {
    var ITEM_PER_PAGE = 5;

    const product = await Product.findOne({ sku: req.params.sku }).populate("stocks");
    var stocks = product.stocks;
    if (req.params.page === "all") {
      var json = { last: 999, stocks: stocks };
      res.status(200).json(json);
      return;
    }

    let lastPage = Math.round(stocks.length / ITEM_PER_PAGE);
    let currentPage = req.params.page;
    let start = ITEM_PER_PAGE * (currentPage - 1);
    let last = Math.min(start + ITEM_PER_PAGE, stocks.length);
    console.log(stocks);
    stocks = stocks.slice(start, last);
    var json = { last: lastPage, stocks: stocks };

    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    const parentProduct = await Product.find({ stocks: { $in: stock } });
    var json = stock.toJSON();
    json.sku = parentProduct[0].sku;
    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStockToSKU = async (req, res) => {
  const stock = new Stock(req.body);
  stock.sold_quantity = 0;
  if (!req.body.date) {
    stock.date = Date.now();
  }
  try {
    const addedStock = await stock.save();
    const product = await Product.findOneAndUpdate({ sku: req.headers.sku }, { $push: { stocks: stock } });
    res.status(201).json(addedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const stock = await Stock.findOne({ _id: req.params.id });
    if (req.body.initial_quantity >= stock.sold_quantity) {
      const updatedStock = await Stock.updateOne({ _id: req.params.id }, { $set: req.body });

      res.status(201).json(updatedStock);
    } else {
      throw new Error("Initial quantity cannot be lower than quantity already sold");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const deletedStock = await Stock.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
