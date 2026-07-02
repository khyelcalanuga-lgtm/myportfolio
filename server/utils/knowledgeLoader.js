import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const knowledgeDir = join(__dirname, '..', 'knowledge')

export function loadKnowledge() {
  const files = readdirSync(knowledgeDir).filter(f => f.endsWith('.md'))
  const parts = files.map(file => {
    const content = readFileSync(join(knowledgeDir, file), 'utf-8')
    return content.trim()
  })
  return parts.join('\n\n---\n\n')
}
