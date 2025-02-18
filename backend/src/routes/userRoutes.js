const express = require("express");
const router = express.Router();
const { verifyRecaptcha } = require("../middleware/recaptchaMiddleware");
const {
  createUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");
const { protectAdmin, protect } = require("../middleware/authMiddleware");

const { validateLogin } = require("../validations/authValidation");
const { validateRequest } = require("../middleware/validateRequest");

router.get("/", protect, protectAdmin, getAllUsers);
router.post("/register", createUser);
router.post(
  "/login",
  verifyRecaptcha,
  validateLogin,
  validateRequest,
  loginUser
);

module.exports = router;
