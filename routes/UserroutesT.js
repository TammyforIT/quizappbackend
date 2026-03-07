import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET USER INFO
router.get("/me", async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error getting user" });
  }
});

// UPDATE USER
router.put("/update", async (req, res) => {
  try {
    const { id, username, email, bio } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { username, email, bio },
      { new: true }
    );

    res.json({ message: "User updated", user: updated });
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// DELETE USER
router.delete("/delete", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.query.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

export default router;
