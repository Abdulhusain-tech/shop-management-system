const express = require("express");
const Sale = require("../models/Sale");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const sale = new Sale(req.body);
  await sale.save();
  res.json(sale);
});

router.get("/report", auth, async (req, res) => {
  const sales = await Sale.find();
  const totalRevenue = sales.reduce((sum, s) => sum + s.totalPrice, 0);
  res.json({ totalSales: sales.length, totalRevenue });
});

module.exports = router;
