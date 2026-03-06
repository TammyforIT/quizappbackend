import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET user info
router.get("/me", async (req, res) => {
  try {
    const user = await User.findOne(); //returns users result
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error getting user" });
  }
});


router.put("/update", async (req, res) => {
  try {
    const { username, email, bio } = req.body;

    const user = await User.findOne(); //find specific user
    user.username = username;
    user.email = email;
    user.bio = bio;

    await user.save();

    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// DELETE user
router.delete("/me", async (req, res) => {
  try {
    await User.deleteOne();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

export default router;
