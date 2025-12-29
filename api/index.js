const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../backend/config/db");
const authRoutes = require("../backend/routes/authRoutes");
const productRoutes = require("../backend/routes/productRoutes");
const salesRoutes = require("../backend/routes/salesRoutes");
const adminRoutes = require("../backend/routes/adminRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Base route
app.get("/api", (req, res) => {
  res.json({ 
    message: "Shop Management System API", 
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// API Routes - IMPORTANT: No /api prefix here
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/admin", adminRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    msg: "Internal server error",
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found", path: req.path });
});

// Export for Vercel
module.exports = app;