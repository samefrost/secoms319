const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Product } = require("./dataSchema"); // import the Product model
const app = express();

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(express.json());
app.use(cors());
app.use(express.static("images"));

mongoose.connect("mongodb://127.0.0.1:27017/reactdata", {
  dbName: "reactdata",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 4000;
const host = "localhost";

app.get("/", async (req, resp) => {
  const query = {};
  const allProducts = await Product.find(query);
  console.log(allProducts);
  resp.set("Access-Control-Allow-Origin", "*");
  resp.send(allProducts);
});

app.get("/:id", async (req, resp) => {
  const id = req.params.id;
  const query = { _id: id };
  const oneProduct = await Product.findOne(query);
  console.log(oneProduct);
  resp.send(oneProduct);
});

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});

app.post("/insert", async (req, res) => {
  console.log(req.body);
  const p_id = req.body._id;
  const ptitle = req.body.title;
  const pprice = req.body.price;
  const pdescription = req.body.description;
  const pcategory = req.body.category;
  const pimage = req.body.image;
  const prate = req.body.rating.rate;
  const pcount = req.body.rating.count;

  const formData = new Product({
    _id: p_id,
    title: ptitle,
    price: pprice,
    description: pdescription,
    category: pcategory,
    image: pimage,
    rating: { rate: prate, count: pcount },
  });
  try {
    // await formData.save();
    await Product.create(formData);
    const messageResponse = { message: `Product ${p_id} added correctly` };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while adding a new product:" + err);
  }
});

app.delete("/delete", async (req, res) => {
  console.log("Delete :", req.body);
  try {
    const query = { _id: req.body._id };
    await Product.deleteOne(query);
    const messageResponse = {
      message: `Product ${req.body._id} deleted correctly`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while deleting :" + p_id + " " + err);
  }
});

app.put("/:id/update-price", async (req, res) => {
  const id = req.params.id;
  const newPrice = req.body.price;

  try {
    const query = { _id: id };
    const update = { $set: { price: newPrice } };
    const options = { new: true }; // Return the updated document
    const updatedProduct = await Product.findOneAndUpdate(
      query,
      update,
      options
    );
    const messageResponse = {
      message: `Price of product ${id} updated to ${newPrice}`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while updating price of product:" + err);
  }
});
