import Product from "../models/ProductModel.js";

export const getProductBySKU = async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const ITEM_PER_PAGE = 5;
    var products = await Product.find();
    let lastPage = Math.round(products.length / ITEM_PER_PAGE);
    let currentPage = req.params.page;
    let start = ITEM_PER_PAGE * (currentPage - 1);
    let last = Math.min(start + ITEM_PER_PAGE, products.length);
    products = products.slice(start, last);
    var json = { last: lastPage, products: products };

    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const addedProduct = await product.save();
    res.status(201).json(addedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
