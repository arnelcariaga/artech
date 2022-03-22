const mongoose = require("mongoose");

const Products = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    qr: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  }
);

mongoose.models = {};

const model = mongoose.model("ProductDatas", Products);

module.exports = model;
