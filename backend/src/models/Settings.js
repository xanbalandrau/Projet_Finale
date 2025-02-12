const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  preferences: { type: Object, default: {} },
  cookies: { type: Object, default: {} },
});

module.exports = mongoose.model("Settings", settingsSchema);
