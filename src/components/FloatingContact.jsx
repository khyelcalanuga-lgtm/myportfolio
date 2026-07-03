import { useState, useEffect, useRef } from 'react'
import './FloatingContact.css'
import avatarImg from '../assets/IMG_7986 (1).png'

const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
)

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const initialMessages = [
  { id: 1, text: 'Hi! Thanks for checking out my portfolio.', sender: 'bot' },
  { id: 2, text: 'Feel free to ask me anything or just say hello!', sender: 'bot' },
]

const portfolioImages = Object.entries(
  import.meta.glob('../assets/**/*.{png,webp}', { eager: true, import: 'default' })
)
  .filter(([path]) => /\/(3dRenderss|graphicdesigns|illustration)\//.test(path))
  .map(([path, src]) => ({ path, src }))
  .reduce((acc, item) => {
    const key = item.path.replace(/\.(png|webp)$/i, '')
    const existing = acc.get(key)
    if (!existing || item.path.toLowerCase().endsWith('.webp')) {
      acc.set(key, item)
    }
    return acc
  }, new Map())
  .values()

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
    ? portfolioImages.filter((item) => item.path.includes(`/${folderBias}/`))
    : portfolioImages

  const keywords = text
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !['show', 'me', 'the', 'my', 'some', 'for', 'and', 'with', 'from', 'your', 'portfolio', 'image', 'images', 'picture', 'pictures', 'visual', 'visuals', 'artwork', 'work', 'examples', 'preview', 'see', 'please', 'about', 'what', 'when', 'want'].includes(word))

  const scored = candidatePool
    .map((item) => {
      const name = item.path.toLowerCase()
      let score = folderBias ? 2 : 0
      keywords.forEach((keyword) => {
        if (name.includes(keyword)) score += 3
      })
      return { ...item, score }
    })
    .sort((a, b) => b.score - a.score)

  const selected = scored.filter((item) => item.score > 0)
  const bestMatch = (selected.length ? selected : scored)[0]
  return bestMatch ? [bestMatch.src] : []
}

const FloatingContact = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!open) return
    // Avoid auto-focusing the input on small screens to prevent instantly opening the keyboard
    const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width:640px)').matches
    if (!isMobile) inputRef.current?.focus()
    const close = (e) => {
      if (e.key === 'Escape' || (e.type === 'mousedown' && !rootRef.current?.contains(e.target))) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', close)
    document.addEventListener('mousedown', close)
    return () => {
      window.removeEventListener('keydown', close)
      document.removeEventListener('mousedown', close)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }])
    setTyping(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      const images = Array.isArray(data.images) && data.images.length > 0
        ? data.images
        : getSuggestedImages(text)
      setMessages(prev => [...prev, { id: Date.now() + 1, text: data.reply, sender: 'bot', images }])
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I'm temporarily unavailable.", sender: 'bot' }])
    } finally {
      setTyping(false)
    }
  }

  return (
    <div className={`floating-contact${open ? ' open' : ''}`} ref={rootRef}>
      <div className="morph-panel">
        <div className="morph-top" onClick={open ? undefined : () => setOpen(true)}>
          <div className="morph-top-left">
            <img className="chat-avatar" src={avatarImg} alt="" />
            <div>
              <div className="chat-head-name">Khyel Calanuga</div>
              <div className="chat-head-status"><span className="status-dot" />Online</div>
            </div>
          </div>
          <button className="chat-head-close" onClick={() => setOpen(false)} aria-label="Close chat">
            <CloseIcon />
          </button>
          <div className="fab-content">
            <ChatIcon />
            <span className="fab-label">Message</span>
          </div>
        </div>
        <div className="chat-body-inner">
          <div className="chat-msgs">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                {msg.sender === 'bot' && <img className="chat-body-avatar" src={avatarImg} alt="" />}
                <div className="chat-bubble">
                  {msg.text}
                  {msg.images?.[0] && (
                    <div className="chat-image-grid">
                      <img className="chat-image" src={msg.images[0]} alt="Portfolio preview" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="chat-msg bot">
                <img className="chat-body-avatar" src={avatarImg} alt="" />
                <div className="chat-bubble typing"><span /><span /><span /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input-row">
            <input className="chat-input" type="text" placeholder="Type a message..." value={input}
              onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} ref={inputRef} aria-label="Message input" />
            <button className="chat-send" onClick={send} disabled={!input.trim()} aria-label="Send message">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FloatingContact
