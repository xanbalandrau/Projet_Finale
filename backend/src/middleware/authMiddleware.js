const JWT = require("jsonwebtoken");
const User = require("../models/Users");
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "").trim();
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized User, Token not found" });
    }

    const decodedToken = JWT.verify(token, JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized token " });
    }

    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verifying token", error });
  }
};
module.exports = protect;
