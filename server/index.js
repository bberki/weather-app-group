/* eslint-env node */
import express from "express";
import mongoose from "mongoose";
import commentsRouter from "./routes/comments.js";

const app = express();

app.use(express.json());
app.use("/api/comments", commentsRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/weather";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => {
    console.error("DB connection error", error);
  });
