import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

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
    const hfToken = process.env.HF_TOKEN
    if (!hfToken) {
      console.error('HF_TOKEN not set')
      return res.status(500).json({ reply: "Server not configured: missing HF_TOKEN." })
    }

    const model = 'qwen/qwen3-coder:free'
    const url = `https://api-inference.huggingface.co/models/${encodeURIComponent(model)}`
    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hfToken}`,
      },
      body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 500, temperature: 0.3 } }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Hugging Face error:', response.status, errText)
      return res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
    }

    const data = await response.json()
    let reply = null
    if (Array.isArray(data) && data.length > 0) {
      reply = data[0].generated_text || (data[0].generated_text && data[0].generated_text.trim())
    } else if (data.generated_text) {
      reply = data.generated_text.trim()
    } else {
      reply = typeof data === 'string' ? data.trim() : JSON.stringify(data)
    }

    res.status(200).json({ reply: reply || "I don't have that information yet." })
  } catch (err) {
    console.error('Chat API error:', err)
    res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
  }
}
