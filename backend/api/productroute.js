
const express = require("express");
const Product = require("../model/product");

const router = express.Router();
router.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    next();
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { product_name, product_desc, status, created_by } = req.body;

    const newProduct = await Product.create({
      product_name,
      product_desc,
      status,
      created_by,
      updated_by: created_by 
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, product_desc, status, updated_by } = req.body;

    const product = await Product.findByPk(id);
    if (!product || product.is_deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.update({
      product_name,
      product_desc,
      status,
      updated_by
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { updated_by } = req.body;

    const product = await Product.findByPk(id);
    if (!product || product.is_deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.update({
      is_deleted: true,
      updated_by
    });

    res.json({ message: "Product soft-deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});


router.get("/live", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        status: "Published",
        is_deleted: false
      }
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch live products" });
  }
});


router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { is_deleted: false }
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
