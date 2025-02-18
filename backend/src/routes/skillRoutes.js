const express = require("express");
const router = express.Router();
const multer = require("multer");

const { protect } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validateRequest");
const { validateCreateSkill } = require("../validations/authValidation");

const {
  createSkill,
  deleteSkill,
  getAllSkills,
  updateSkill,
} = require("../controllers/skillController");

const upload = multer({ dest: "uploads/" });

router.get("/", getAllSkills);
router.post(
  "/addSkill",
  upload.single("imageFile"),
  protect,
  validateCreateSkill,
  validateRequest,
  createSkill
);
router.put(
  "/:id",
  upload.single("imageFile"),
  protect,
  validateCreateSkill,
  validateRequest,
  updateSkill
);
router.delete("/:id", protect, deleteSkill);

module.exports = router;
