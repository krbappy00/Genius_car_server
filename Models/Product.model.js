const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
  img_url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Product = new mongoose.model("Products", productSchema);
module.exports = Product;
