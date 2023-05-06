const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
const { Product } = require("./dataSchema");
const { CartProduct } = require("./dataSchemaCart");


app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(cors());
app.use(express.static("images"));

mongoose.connect("mongodb://localhost:27017/final_db", {
  dbName: "final_db",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 4000;
const host = "localhost";

app.get("/", async (req, resp) => {
  const query = {};
  const allProducts = await Product.find(query);
  console.log(allProducts);
  resp.send(allProducts);
});

app.get("/search/:title", async (req, resp) => {
  const query = { title: { $regex: req.params.title, $options: "i" } };
  const searchResult = await Product.find(query);
  console.log(searchResult);
  resp.send(searchResult);
});

app.post("/addToCart", async (req, resp) => {
  const { _id, title, artist, description, price, src } = req.body;
  const item = new CartProduct({ _id, title, artist, description, price, src, quantity: 1 });
  try {
    await item.save();
    console.log(`Item ${title} added to cart!`);
    resp.sendStatus(200);
  } catch (err) {
    console.error("Error adding item to cart:", err);
    resp.sendStatus(500);
  }
});

app.get("/cart", async (req, resp) => {
  const allCartItems = await CartProduct.find({});
  console.log(allCartItems);
  resp.send(allCartItems);
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

app.delete("/deleteitem", async (req, res) => {
    console.log("Delete :", req.body);
    try {
      const query = { _id: req.body._id };
      await CartProduct.deleteOne(query);
      const messageResponse = {
        message: `Cart item ${req.body._id} deleted correctly`,
      };
      res.send(JSON.stringify(messageResponse));
    } catch (err) {
      console.log("Error while deleting cart item with id " + req.body._id + ": " + err);
    }
  });

  app.put("/:id/update-quantity", async (req, res) => {
    const id = req.params.id;
    const newQuantity = req.body.quantity;
  
    try {
      const query = { _id: id };
      const update = { $set: { quantity: newQuantity } };
      const options = { new: true }; // Return the updated document
      const updatedCartItem = await CartProduct.findOneAndUpdate(
        query,
        update,
        options
      );
      const messageResponse = {
        message: `Quantity of product ${id} updated to ${newQuantity}`,
      };
      res.send(JSON.stringify(messageResponse));
    } catch (err) {
      console.log("Error while updating quantity of product:" + err);
    }
  });
  
