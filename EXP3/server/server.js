const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SecureAuth RBAC Backend is Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});