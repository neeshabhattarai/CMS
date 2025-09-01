const cors = require("cors");
const express = require("express");
const app = express();
const productRoute = require("./api/productroute"); // keep as is

const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/product", productRoute);

app.get("/", (req, res) => {
  res.json({ message: "working" });
});




module.exports = app; 
