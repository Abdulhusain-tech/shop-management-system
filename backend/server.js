const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");
const adminRoutes = require("./routes/adminRoutes");

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

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Shop Management System API", 
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// Test API route
app.get("/api", (req, res) => {
  res.json({ 
    message: "API is working!", 
    endpoints: {
      auth: "/api/auth/login, /api/auth/register",
      products: "/api/products (requires auth)",
      sales: "/api/sales (requires auth)",
      admin: "/api/admin (requires auth)"
    }
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/admin", adminRoutes);

// Error handlers
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    msg: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found", path: req.path });
});

// Export for Vercel (no local server)
module.exports = app;