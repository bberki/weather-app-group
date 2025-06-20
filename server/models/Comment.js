/* eslint-env node */
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  city: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Comment", commentSchema);
