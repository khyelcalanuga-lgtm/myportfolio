import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './header.css'

const SECTIONS = ['home', 'works', 'About', 'contact']

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640)
    const [active, setActive] = useState('home')

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 640)
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    useEffect(() => {
        const onScroll = () => {
            const mid = window.innerHeight / 2
            let best = null
            for (const id of SECTIONS) {
                const el = document.getElementById(id)
                if (!el) continue
                const rect = el.getBoundingClientRect()
                if (rect.top <= mid && rect.bottom >= mid) {
                    setActive(id)
                    return
                }
                if (rect.top <= mid && (!best || rect.bottom > best.bottom)) {
                    best = { id, bottom: rect.bottom }
                }
            }
            if (best) setActive(best.id)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const navContent = (
        <ul onClick={(e) => e.stopPropagation()}>
            <li><a href="#home" className={active === 'home' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#works" className={active === 'works' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Works</a></li>
            <li><a href="#About" className={active === 'About' ? 'active' : ''} onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#contact" className={active === 'contact' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
    )

    return (
        <div className="header">
            <div className="name" data-reveal>
                <span className="firstname">Khyel.</span>
                <span className="lastname">Calanuga</span>
            </div>
            <button
                className={`hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span />
                <span />
                <span />
            </button>
            <div className="nav">
                {navContent}
            </div>
            {isMobile && createPortal(
                <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
                    {navContent}
                </div>,
                document.body
            )}
        </div>
    )
}

export default Header