const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

/**
 * CREATE PRODUCT
 * Admin & Owner only
 */
router.post("/", auth, role("admin", "owner"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      createdBy: req.user.id
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: "Error creating product" });
  }
});

/**
 * GET ALL PRODUCTS
 * All logged-in users
 */
router.get("/", auth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/**
 * UPDATE PRODUCT
 * Admin & Owner only
 */
router.put("/:id", auth, role("admin", "owner"), async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedProduct);
});

/**
 * DELETE PRODUCT
 * Admin only
 */
router.delete("/:id", auth, role("admin"), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Product deleted successfully" });
});

module.exports = router;
