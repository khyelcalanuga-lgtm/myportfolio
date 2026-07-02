import { config } from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
config({ path: join(dirname(fileURLToPath(import.meta.url)), '.env') })

import express from 'express'
import cors from 'cors'
import chatRouter from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

app.use('/api/chat', chatRouter)
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
app.use(express.static(dist))
app.use((_req, res) => res.sendFile(join(dist, 'index.html')))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})
