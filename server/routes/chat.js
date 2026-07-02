import { Router } from 'express'
import { loadKnowledge } from '../utils/knowledgeLoader.js'
import { readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const router = Router()
const knowledge = loadKnowledge()
const assetsDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'assets')
const portfolioImages = [
  ...readdirSync(join(assetsDir, '3dRenderss')),
  ...readdirSync(join(assetsDir, 'graphicdesigns')),
  ...readdirSync(join(assetsDir, 'illustration')),
]
  .filter((file) => /\.(png|webp)$/i.test(file))
  .map((file) => `/src/assets/${file}`)

const getSuggestedImages = (message) => {
  const text = message.toLowerCase()
  const wantsVisuals = /\b(image|images|picture|pictures|visual|visuals|artwork|portfolio|show|display|preview|examples|work|see)\b/.test(text)

  if (!wantsVisuals) return []

  const folderBias = /\b(3d|render|renders|rendered)\b/.test(text)
    ? '3dRenderss'
    : /\b(graphic|design|poster|branding|brand)\b/.test(text)
      ? 'graphicdesigns'
      : /\b(illustration|illustrations|illustrator)\b/.test(text)
        ? 'illustration'
        : null

  const candidatePool = folderBias
    ? portfolioImages.filter((img) => img.includes(`/${folderBias}/`))
    : portfolioImages

  const keywords = text
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !['show','me','the','my','some','for','and','with','from','your','portfolio','image','images','picture','pictures','visual','visuals','artwork','work','examples','preview','see','please','about','what','when','want'].includes(word))

  const scored = candidatePool
    .map((img) => {
      const name = img.toLowerCase()
      let score = folderBias ? 2 : 0
      keywords.forEach((keyword) => {
        if (name.includes(keyword)) score += 3
      })
      return { img, score }
    })
    .sort((a, b) => b.score - a.score)

  const selected = scored.filter((item) => item.score > 0)
  const bestMatch = (selected.length ? selected : scored)[0]
  return bestMatch ? [bestMatch.img] : []
}

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
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
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
      console.error('Groq error:', response.status, errText)
      return res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content?.trim()
    const images = getSuggestedImages(message)
    res.json({ reply: reply || "I don't have that information yet.", images })
  } catch (err) {
    console.error('Chat API error:', err)
    res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
  }
})

export default router
