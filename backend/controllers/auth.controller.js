import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    // Validate the request
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Check if the password is at least 6 characters long
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters long.",
      });
    }

    // Check if the user already exists
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. ",
      });
    }

    // Check if the username already exists
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Generate a random profile picture
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // Create a new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      image: image,
    });

    // Generate a JWT token
    generateTokenAndSetCookie(newUser._id, res);
    // Save the user
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: {
        ...newUser._doc,
        password: "", // Remove the password from the response
      },
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
	try {
		res.clearCookie("jwt-netflix");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

