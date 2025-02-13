const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");
const { protectAdmin, protect } = require("../middleware/authMiddleware");

router.get("/", protect, protectAdmin, getAllUsers);
router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
