/* eslint-env node */
import express from "express";
import Comment from "../models/Comment.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// POST /api/comments - Add a new comment (requires auth)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { city, text } = req.body;
    const comment = await Comment.create({
      user: req.user.id || req.user.name || req.user.username,
      city,
      text,
      date: new Date(),
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatasi" });
  }
});

// GET /api/comments/:city - Get all comments for a city
router.get("/:city", async (req, res) => {
  try {
    const comments = await Comment.find({ city: req.params.city }).sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatasi" });
  }
});

export default router;
