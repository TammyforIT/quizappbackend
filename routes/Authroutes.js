import express from "express";
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });
    res.json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) return res.status(400).json({ error: "Invalid login" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

export default router;
