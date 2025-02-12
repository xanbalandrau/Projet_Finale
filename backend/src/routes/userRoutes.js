const express = require("express");
const router = express.Router();

const { createUser, loginUser, getAllUsers } = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
