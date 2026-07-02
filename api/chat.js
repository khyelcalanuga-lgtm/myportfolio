import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed.' })
  }

  const { message } = req.body
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: 'Please provide a valid message.' })
  }

  const knowledgeDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'server', 'knowledge')
  const files = readdirSync(knowledgeDir).filter(f => f.endsWith('.md'))
  const parts = files.map(file => {
    const content = readFileSync(join(knowledgeDir, file), 'utf-8')
    return content.trim()
  })
  const knowledge = parts.join('\n\n---\n\n')

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

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-lite',
      systemInstruction: SYSTEM_PROMPT,
    })

    const result = await model.generateContent(message)
    const reply = result.response.text().trim()
    res.status(200).json({ reply: reply || "I don't have that information yet." })
  } catch (err) {
    console.error('Chat API error:', err)
    res.status(502).json({ reply: "Sorry, I'm temporarily unavailable.", debug: err.message })
  }
}
