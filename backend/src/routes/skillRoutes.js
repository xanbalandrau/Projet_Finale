const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");

const {
  createSkill,
  deleteSkill,
  getAllSkills,
  updateSkill,
} = require("../controllers/skillController");

const upload = multer({ dest: "uploads/" });

router.get("/", protect, getAllSkills);
router.post("/addSkill", upload.single("imageFile"), protect, createSkill);
router.put("/:id", upload.single("imageFile"), protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

module.exports = router;
