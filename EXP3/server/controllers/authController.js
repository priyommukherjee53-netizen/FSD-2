const users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({
      message: "Invalid Username",
    });
  }

  // Compare password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  // Generate JWT Token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    message: "Login Successful",
    token,
    user: {
      username: user.username,
      role: user.role,
    },
  });
};

module.exports = {
  login,
};