const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get Authorization Header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied. No Token Provided."
    });
  }

  // Token format: Bearer <token>
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid Token Format."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or Expired Token."
    });
  }
};

module.exports = authenticateToken;