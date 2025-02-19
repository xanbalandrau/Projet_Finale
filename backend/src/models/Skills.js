const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, index: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  urlImage: { type: String },
  public_id: { type: String },
});

// Middleware pour limiter à 9 skills
skillSchema.pre("save", async function (next) {
  const Skill = mongoose.model("Skill");

  const count = await Skill.countDocuments();
  if (count >= 9) {
    const error = new Error("Vous ne pouvez pas ajouter plus de 4 skills.");
    return next(error);
  }

  next();
});

module.exports = mongoose.model("Skill", skillSchema);
