const JWT = require("jsonwebtoken");
const User = require("../models/Users");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized no token" });
    }

    const decodedToken = JWT.verify(token, JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized token " });
    }

    req.user = await User.findById(decodedToken._id).select("-password");
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verifying token", error });
  }
};
module.exports = protect;
