import mongoose from "mongoose";

const Stock = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  buy_price: {
    type: Number,
    required: true,
  },
  initial_quantity: {
    type: Number,
    required: true,
  },
  sold_quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transactions",
    },
  ],
});

export default mongoose.model("Stocks", Stock);
