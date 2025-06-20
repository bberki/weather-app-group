/* eslint-env node */
/* global process */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './server/routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
