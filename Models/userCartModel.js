// user.model.js
const mongoose = require("mongoose");

const userCartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: mongoose.Schema.Types.String,
        ref: "Product",
        required: false,
      },
      price:{
        type: mongoose.Schema.Types.Number,
        ref: "Product",
        required: false,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const UserCart = mongoose.model("UserCart", userCartSchema);

module.exports = UserCart;
