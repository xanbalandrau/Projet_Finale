const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");

const { createSkill, deleteSkill } = require("../controllers/skillController");

const upload = multer({ dest: "uploads/" });

router.post("/addSkill", upload.single("imageFile"), protect, createSkill);
router.delete("/:id", protect, deleteSkill);


module.exports = router;
