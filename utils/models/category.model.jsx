const mongoose = require("mongoose");

const Categories = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  }
);

mongoose.models = {};

const model = mongoose.model("CategoryDatas", Categories);

module.exports = model;
