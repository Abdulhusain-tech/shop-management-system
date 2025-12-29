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
    const { name, price, quantity, image } = req.body;

    // Validation
    if (!name || !price || !quantity) {
      return res.status(400).json({ msg: "Name, price, and quantity are required" });
    }

    if (price <= 0) {
      return res.status(400).json({ msg: "Price must be greater than 0" });
    }

    if (quantity < 0) {
      return res.status(400).json({ msg: "Quantity cannot be negative" });
    }

    const product = new Product({
      name,
      price,
      quantity,
      image: image || null, // Store base64 image
      createdBy: req.user.id
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ msg: "Error creating product" });
  }
});

/**
 * GET ALL PRODUCTS
 * All logged-in users
 */
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ msg: "Error fetching products" });
  }
});

/**
 * GET SINGLE PRODUCT
 * All logged-in users
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ msg: "Error fetching product" });
  }
});

/**
 * UPDATE PRODUCT
 * Admin & Owner only
 */
router.put("/:id", auth, role("admin", "owner"), async (req, res) => {
  try {
    const { price, quantity, image } = req.body;

    // Validation
    if (price !== undefined && price <= 0) {
      return res.status(400).json({ msg: "Price must be greater than 0" });
    }

    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({ msg: "Quantity cannot be negative" });
    }

    const updateData = {};
    if (price !== undefined) updateData.price = price;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (image !== undefined) updateData.image = image;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ msg: "Error updating product" });
  }
});

/**
 * DELETE PRODUCT
 * Admin only
 */
router.delete("/:id", auth, role("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ msg: "Error deleting product" });
  }
});

module.exports = router;