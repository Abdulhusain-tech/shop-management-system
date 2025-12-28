const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Health check
app.get("/api", (req, res) => {
  res.json({
    message: "Shop Management System API",
    status: "running"
  });
});

module.exports = app;
