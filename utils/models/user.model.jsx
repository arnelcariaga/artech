const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    userProfile: {
      type: String,
      default: "/img/user-icon-placeholder.png",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

const model = mongoose.model("UserData", User);

module.exports = model;
