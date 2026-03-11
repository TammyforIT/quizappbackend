import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    return res.json({
      message: "User registered",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio || ""
      }
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [
        { username: identifier },
        { email: identifier }
      ]
    });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Incorrect password" });

    return res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio || ""
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

export default router;
