const mongoose = require("mongoose");
const ReactFormDataSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: {type: String},
    artist: {type: String},
    genre: {type: String},
    price: { type: Number },
    description: {type: String},
    src: {type: String},
    stock: { type: Number },
    rating: {
      rate: { type: Number },
      count: { type: Number },
    },
  },
  { collection: "store_catalog" }
);

const Product = mongoose.model('Product', ReactFormDataSchema);

module.exports = {
  Product,
};