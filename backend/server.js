const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");
const adminRoutes = require("./routes/adminRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Shop Management System API", status: "running" });
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/sales", salesRoutes);
app.use("/admin", adminRoutes);

/**
 * ✅ EXPORT SERVERLESS HANDLER
 * ❌ DO NOT use app.listen()
 */
module.exports = serverless(app);
