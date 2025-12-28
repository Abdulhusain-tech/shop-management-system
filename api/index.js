const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("../backend/routes/authRoutes"));
app.use("/api/products", require("../backend/routes/productRoutes"));
app.use("/api/sales", require("../backend/routes/salesRoutes"));
app.use("/api/admin", require("../backend/routes/adminRoutes"));

app.get("/api", (req, res) => {
  res.json({
    message: "Shop Management System API",
    status: "running"
  });
});

module.exports = app;
