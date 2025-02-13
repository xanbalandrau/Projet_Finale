const User = require("../models/Users");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return next({ status: 400, message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return next({ status: 400, message: "User already exists" });
    }

    const salRound = 10;
    const hashedPassword = await bcrypt.hash(String(password), salRound);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({ status: 400, message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next({ status: 400, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      String(password),
      user.password
    );

    if (!isPasswordValid) {
      return next({ status: 401, message: "Invalid email or password" });
    }

    res.status(201).json({
      message: "Login successful",
      token: await user.generateToken(),
    });
  } catch (error) {
    next(error);
  }
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
