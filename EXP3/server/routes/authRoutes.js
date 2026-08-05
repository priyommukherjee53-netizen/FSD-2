const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// Login
router.post("/login", login);

// Dashboard (Any Logged-in User)
router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to Dashboard",
    user: req.user,
  });
});

// Admin Only
router.get(
  "/admin",
  authenticateToken,
  authorizeRole("Admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin!",
    });
  }
);

// Editor Only
router.get(
  "/editor",
  authenticateToken,
  authorizeRole("Editor"),
  (req, res) => {
    res.json({
      message: "Welcome Editor!",
    });
  }
);

// Viewer Only
router.get(
  "/viewer",
  authenticateToken,
  authorizeRole("Viewer"),
  (req, res) => {
    res.json({
      message: "Welcome Viewer!",
    });
  }
);

module.exports = router;