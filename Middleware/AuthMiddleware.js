const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    const payload = jwt.verify(authHeader, JWT_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authenticateJWT;
