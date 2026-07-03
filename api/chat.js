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

Keep responses very short — 1 to 3 sentences max. Be friendly and professional. Avoid using asterisk characters or any markdown formatting. Use plain text only.

You can answer any question freely. Use the knowledge below as context about yourself, but feel free to answer other questions too.

=== KNOWLEDGE ===
${knowledge}`

  try {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not set')
      return res.status(500).json({ reply: "Server not configured: missing API key." })
    }

    const models = [
      process.env.OPENROUTER_MODEL || 'openai/gpt-oss-120b:free',
      'nousresearch/hermes-3-llama-3.1-405b:free',
    ]

    const siteUrl = process.env.SITE_URL || 'http://localhost:5173'

    let lastError = null
    for (const model of models) {
      for (let attempt = 0; attempt < 2; attempt++) {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': siteUrl,
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

        if (response.ok) {
          const data = await response.json()
          const reply = data?.choices?.[0]?.message?.content?.trim() || "I don't have that information yet."
          return res.status(200).json({ reply })
        }

        lastError = await response.text()

        if (response.status === 429) {
          let wait = 3
          try {
            const errJson = JSON.parse(lastError)
            wait = (errJson?.error?.metadata?.retry_after_seconds_raw || 3) + 1
          } catch {}
          console.error(`Rate limited on ${model}, retrying in ${wait}s...`)
          await new Promise(r => setTimeout(r, wait * 1000))
          continue
        }

        if (response.status === 402 || response.status === 401) {
          break
        }
      }
    }

    console.error('OpenRouter error:', lastError)
    return res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
  } catch (err) {
    console.error('Chat API error:', err)
    res.status(502).json({ reply: "Sorry, I'm temporarily unavailable." })
  }
}
