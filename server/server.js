import { config } from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
config({ path: join(dirname(fileURLToPath(import.meta.url)), '.env') })

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import chatRouter from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 3001

app.disable('x-powered-by')

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}))

app.use(cors({
  origin: ['https://khyelcalanuga.dev', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  maxAge: 86400,
}))

app.use(express.json({ limit: '10kb' }))

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: { reply: "I'm resting. Try again in a minute." },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/chat', chatLimiter)
app.use('/api/chat', chatRouter)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
