import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Incorrect password" });

    return res.json({ message: "Login successful", userId: user._id });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

export default router;
