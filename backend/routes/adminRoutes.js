const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

/**
 * CREATE USER (Admin Only)
 * Admins can create users with any role
 */
router.post("/create-user", auth, role("admin"), async (req, res) => {
  try {
    const { name, email, password, role: userRole } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole
    });

    await user.save();
    res.json({ 
      msg: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * GET ALL USERS (Admin Only)
 */
router.get("/users", auth, role("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * UPDATE USER ROLE (Admin Only)
 */
router.put("/users/:id", auth, role("admin"), async (req, res) => {
  try {
    const { role: newRole } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: newRole },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * DELETE USER (Admin Only)
 */
router.delete("/users/:id", auth, role("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * BACKUP DATABASE (Admin Only)
 */
router.get("/backup", auth, role("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const Product = require("../models/Product");
    const Sale = require("../models/Sale");
    
    const products = await Product.find();
    const sales = await Sale.find();

    const backup = {
      timestamp: new Date().toISOString(),
      data: {
        users,
        products,
        sales
      }
    };

    res.json(backup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Backup failed" });
  }
});

module.exports = router;