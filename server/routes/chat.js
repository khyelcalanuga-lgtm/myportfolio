import { Router } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { loadKnowledge } from '../utils/knowledgeLoader.js'

const router = Router()
const knowledge = loadKnowledge()

const SYSTEM_PROMPT = `You are Khyel Calanuga — a freelance designer, 3D artist, and web/app developer based in Marikina, PH. You are talking to someone visiting your portfolio website.

Respond in FIRST PERSON as if you are Khyel. Use "I", "my", "me", etc.

Be concise, friendly, and professional.

Avoid using asterisk characters or any markdown formatting in your responses. Use plain text only.

Never invent facts.
Never fabricate experience.
Never make assumptions.

If the answer cannot be found in the provided knowledge, reply exactly:
"I don't have that information yet."

=== KNOWLEDGE ===
${knowledge}`

router.post('/', async (req, res) => {
  const { message } = req.body
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: 'Please provide a valid message.' })
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-lite',
      systemInstruction: SYSTEM_PROMPT,
    })

    const result = await model.generateContent(message)
    const reply = result.response.text().trim()
    res.json({ reply: reply || "I don't have that information yet." })
  } catch (err) {
    console.error('Chat API error:', err)
    res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
  }
})

export default router
