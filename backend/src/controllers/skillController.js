const Skill = require("../models/Skills");
const User = require("../models/Users");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.createSkill = async (req, res) => {
  const { title, category, level } = req.body;
  const userId = req.user._id;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "skills",
    });
    fs.unlinkSync(req.file.path);

    let urlImage = uploadResult.secure_url;
    let public_id = uploadResult.public_id;

    const newSkill = new Skill({
      title,
      category,
      level,
      urlImage,
      public_id,
    });
    await newSkill.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { skill: newSkill } },
      { new: true }
    ).select("-password");
    await user.save();

    res.status(201).json({ message: "Skill created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating skill", error: `${error}` });
  }
};

exports.deleteSkill = async (req, res) => {
  const userId = req.user._id;
  const skillId = req.params.id;
  try {
    const skill = await Skill.findByIdAndDelete(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    await cloudinary.uploader.destroy(skill.public_id);

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { skill: skill._id } },
      { new: true }
    ).select("-password");

    await user.save();
    res.status(200).json({ message: "Skill deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill", error });
  }
};
