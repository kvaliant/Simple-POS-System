import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import StockRoute from "./routes/StockRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";

const app = express();
mongoose.connect("mongodb://localhost:27017/simplepos_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connection successful"));

app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(StockRoute);
app.use(TransactionRoute);

app.listen(5000, () => console.log("Server up and running"));
