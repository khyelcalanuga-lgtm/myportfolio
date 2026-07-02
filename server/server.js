import { config } from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
config({ path: join(dirname(fileURLToPath(import.meta.url)), '.env') })

import express from 'express'
import cors from 'cors'
import fs from 'fs'
import chatRouter from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/chat', chatRouter)
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

app.get('/test', (_req, res) => res.send('ok'))
app.use(express.static(dist))
app.use((_req, res) => res.sendFile(join(dist, 'index.html')))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
