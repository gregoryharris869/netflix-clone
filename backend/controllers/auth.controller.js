import { User } from "../models/user.model.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters long.",
      });
    }
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. ",
      });
    }
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists.",
      });
    }

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      username: username,
      email: email,
      password: password,
      image: image,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.log("Error in signup: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

export async function login(req, res) {
  res.send("Login route");
}

export async function logout(req, res) {
  res.send("Logout route");
}
