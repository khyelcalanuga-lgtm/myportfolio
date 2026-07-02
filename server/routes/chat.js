import { Router } from 'express'
import { loadKnowledge } from '../utils/knowledgeLoader.js'

const router = Router()
const knowledge = loadKnowledge()

const SYSTEM_PROMPT = `You are Khyel Calanuga's personal AI assistant.

Answer ONLY using the provided knowledge below.

Never invent facts.
Never fabricate experience.
Never make assumptions.

If the answer cannot be found in the provided knowledge, reply exactly:
"I don't have that information yet."

Be concise, friendly, and professional.

=== KNOWLEDGE ===
${knowledge}`

const MODEL = process.env.OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct:free'

router.post('/', async (req, res) => {
  const { message } = req.body
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: 'Please provide a valid message.' })
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:5173',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('OpenRouter error:', response.status, errText)
      return res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content?.trim()
    res.json({ reply: reply || "I don't have that information yet." })
  } catch (err) {
    console.error('Chat API error:', err)
    res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
  }
})

export default router
