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

const portfolioItems = [
  { title: 'Bugatti', path: 'Bugatti.webp', aliases: ['bugatti', 'car', 'product render', 'blender', '3d'] },
  { title: 'Terre D\'Hermes', path: 'Terre D\'Hermes.webp', aliases: ['hermes', 'product render', 'blender', '3d'] },
  { title: 'Khyel', path: 'Khyel.webp', aliases: ['khyel', '3d render', 'character render'] },
  { title: 'Cup', path: 'Cup.webp', aliases: ['cup', 'product render', '3d'] },
  { title: 'Room', path: 'Room.webp', aliases: ['room', 'interior render', '3d'] },
  { title: 'Fight Club', path: 'FightClub.webp', aliases: ['fight club', 'poster', 'graphic design'] },
  { title: 'Moon Knight', path: 'MoonKnight.webp', aliases: ['moon knight', 'poster', 'graphic design'] },
  { title: 'Noah Schnapp Poster', path: 'NoahSchnappPoster.webp', aliases: ['noah schnapp', 'poster', 'graphic design'] },
  { title: 'Clairo', path: 'clairo.webp', aliases: ['clairo', 'illustration', 'digital art'] },
  { title: 'Random 1', path: 'rndm.webp', aliases: ['random', 'illustration', 'digital art'] },
]

const recommendedPortfolio = [
  'Bugatti.webp',
  'FightClub.webp',
  'clairo.webp',
]

const isPortfolioQuery = (text) => /\b(best work|portfolio|portfolio pieces|my work|projects|examples|show.*work|show.*portfolio|what have you done)\b/.test(text)
const isWhichQuery = (text) => /\b(which one|which project|which design|what should i choose|which should i|which should i choose)\b/.test(text)

const findMatchingPortfolioItem = (message) => {
  const text = message.toLowerCase()
  const scores = portfolioItems.map((item) => {
    let score = 0
    const title = item.title.toLowerCase()
    item.aliases.forEach((alias) => {
      if (text.includes(alias)) score += 5
    })
    if (text.includes(title)) score += 6
    const words = text.split(/[^a-z0-9]+/).filter(Boolean)
    words.forEach((word) => {
      if (title.includes(word) || item.aliases.some((alias) => alias.includes(word))) score += 1
    })
    return { item, score }
  }).sort((a, b) => b.score - a.score)
  return scores[0]?.score > 0 ? scores[0].item : null
}

const getSuggestedImages = (message) => {
  const text = message.toLowerCase()
  const wantsVisuals = /\b(image|images|picture|pictures|visual|visuals|artwork|portfolio|show|display|preview|examples|work|see)\b/.test(text)
  if (!wantsVisuals && !isWhichQuery(text)) return []

  const specificItem = findMatchingPortfolioItem(text)
  if (specificItem && isWhichQuery(text)) {
    return [specificItem.path]
  }

  if (isPortfolioQuery(text) || isWhichQuery(text)) {
    return specificItem ? [specificItem.path] : recommendedPortfolio
  }

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

If the visitor asks to see your work, mention a few portfolio pieces and describe what makes them strong. If they ask which one to choose, recommend a specific project by name.

Answer in 1-2 short sentences. Direct, no fluff, no greetings. Just answer what was asked. No markdown or asterisks. Use plain text only.

You can answer any question freely. Use the knowledge below as context about yourself, but feel free to answer other questions too.

=== KNOWLEDGE ===
${knowledge}`

router.post('/', async (req, res) => {
  const { message } = req.body
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: 'Please provide a valid message.' })
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not set')
      return res.status(500).json({ reply: "Server not configured: missing API key." })
    }

    const model = process.env.OPENROUTER_MODEL || 'qwen/qwen3-8b'

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:5173',
        'X-Title': 'Khyel Portfolio Chat',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        max_tokens: 150,
        temperature: 0.5,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('OpenRouter error:', response.status, errText)
      return res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content?.trim() || "I don't have that information yet."
    const images = getSuggestedImages(message)
    res.json({ reply, images })
  } catch (err) {
    console.error('Chat API error:', err)
    res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
  }
})

export default router
