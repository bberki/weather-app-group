/* eslint-env node */
/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { JWT_SECRET, MONGO_URI } = process.env;
console.log('Mongo URI:', MONGO_URI);

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  // This is a mock authentication for example purposes
  const token = jwt.sign({ email }, JWT_SECRET || 'secret');
  res.json({ token });
});

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
