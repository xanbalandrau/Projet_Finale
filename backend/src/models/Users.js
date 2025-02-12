const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlenght: 20, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    skill: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = function () {
  try {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

module.exports = mongoose.model("User", userSchema);
