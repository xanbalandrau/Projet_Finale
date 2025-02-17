const Skill = require("../models/Skills");
const User = require("../models/Users");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.createSkill = async (req, res, next) => {
  const { title, category, level } = req.body;
  const userId = req.user._id;
  try {
    if (!req.file) {
      return next({ status: 400, message: "Image is required" });
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
    next(error);
  }
};

exports.deleteSkill = async (req, res, next) => {
  const userId = req.user._id;
  const skillId = req.params.id;
  try {
    const skill = await Skill.findByIdAndDelete(skillId);
    if (!skill) {
      return next({ status: 404, message: "Skill not found" });
    }

    if (skill.public_id) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.destroy(
          skill.public_id
        );

        if (cloudinaryResponse.result !== "ok") {
          throw new Error("Error deleting image on Cloudinary");
        }
      } catch (cloudinaryError) {
        console.error("Error Cloudinary :", cloudinaryError);
        return next({
          status: 500,
          message: "Error deleting image on Cloudinary",
          error: cloudinaryError,
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { skill: skill._id } },
      { new: true }
    ).select("-password");

    await user.save();
    res.status(200).json({ message: "Skill deleted successfully", user });
  } catch (error) {
    next(error);
  }
};

exports.getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().select("-public_id");
    res.status(200).json({ skills });
  } catch (error) {
    next(error);
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const { title, category, level } = req.body;
    const skillId = req.params.id;

    let urlImage = req.body.urlImage;
    let public_id = req.body.public_id;

    if (req.file) {
      // upload if there is a new image
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "skills",
      });

      fs.unlinkSync(req.file.path);

      urlImage = uploadResult.secure_url;
      public_id = uploadResult.public_id;

      if (req.body.public_id) {
        try {
          await cloudinary.uploader.destroy(req.body.public_id);
          console.log("Deleted previous image successfully");
        } catch (error) {
          console.error("Error deleting previous image on Cloudinary:", error);
        }
      }
    }
    const skill = await Skill.findByIdAndUpdate(
      skillId,
      {
        title,
        category,
        level,
        urlImage,
        public_id,
      },
      { new: true }
    );

    if (!skill) {
      return next({ status: 404, message: "Skill not found" });
    }

    res.status(200).json({ message: "Skill updated successfully", skill });
  } catch (error) {
    next(error);
  }
};
