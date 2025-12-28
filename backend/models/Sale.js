const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  productName: String,
  quantity: Number,
  totalPrice: Number,
  soldBy: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sale", SaleSchema);
