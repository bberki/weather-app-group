/* eslint-env node */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import commentsRouter from "./routes/comments.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use("/api/comments", commentsRouter);

// existing simple login for AuthPage popup
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret');
  res.json({ token });
});

// mock weather endpoint
app.get('/weather/:city', (req, res) => {
  const { city } = req.params;
  const data = {
    id: city,
    location_name: city.charAt(0).toUpperCase() + city.slice(1),
    latitude: 0,
    longitude: 0,
    datetime: new Date().toISOString(),
    temperature: 25,
    humidity: 50,
    weather_description: 'Açık',
    wind_speed: 3,
    wind_direction: 90,
    pressure: 1010,
    icon_code: '01d',
    expertOpinions: [],
  };
  res.json(data);
});

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGO_URL ||
  "mongodb://localhost:27017/weather";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => {
    console.error("DB connection error", error);
  });
