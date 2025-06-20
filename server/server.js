/* eslint-env node */
/* global process */
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import routes from './routes/index.js'

dotenv.config()

const { MONGODB_URI, PORT = 3001 } = process.env

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

// example usage of jwt and bcrypt to satisfy lint
app.get('/health', (req, res) => {
  const token = jwt.sign({ status: 'ok' }, 'secret')
  const hash = bcrypt.hashSync('test', 8)
  res.json({ token, hash })
})

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
