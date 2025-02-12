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

module.exports = mongoose.model("Skill", skillSchema);
