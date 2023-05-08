const mongoose = require("mongoose");
const ReactFormDataSchema = new mongoose.Schema(
  {
    _id: {type: Number},
    title: {type: String},
    artist: {type: String},
    price: { type: Number },
    src: {type: String},
    quantity: { type: Number },
  },
  { collection: "cart_items" }
);

const CartProduct = mongoose.model('CartProduct', ReactFormDataSchema);

module.exports = {
  CartProduct,
};