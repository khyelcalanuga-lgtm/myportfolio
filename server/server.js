import { config } from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
config({ path: join(dirname(fileURLToPath(import.meta.url)), '.env') })

import express from 'express'
import cors from 'cors'
import chatRouter from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/chat', chatRouter)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
