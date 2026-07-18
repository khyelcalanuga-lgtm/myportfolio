import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './header.css'

const SECTIONS = ['home', 'works', 'about', 'contact']
const ID_MAP = { home: 'home', works: 'works', about: 'About', contact: 'contact' }

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
            for (const section of SECTIONS) {
                const id = ID_MAP[section]
                const el = document.getElementById(id)
                if (!el) continue
                const rect = el.getBoundingClientRect()
                if (rect.top <= mid && rect.bottom >= mid) {
                    setActive(section)
                    return
                }
                if (rect.top <= mid && (!best || rect.bottom > best.bottom)) {
                    best = { id: section, bottom: rect.bottom }
                }
            }
            if (best) setActive(best.id)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // handle back/forward navigation
    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'
        }

        // force top of page on first load regardless of path
        window.scrollTo(0, 0)

        // re-scroll after all assets finish loading to fix layout shift issues
        const onLoad = () => window.scrollTo(0, 0)
        window.addEventListener('load', onLoad)

        const scrollToPath = (path) => {
            const raw = path && path !== '' ? path.replace(/^\//, '') : 'home'
            const section = raw.toLowerCase()
            const id = ID_MAP[section] || ID_MAP['home']
            const el = document.getElementById(id)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setActive(section)
            }
        }

        const onPop = () => scrollToPath(window.location.pathname.replace(/^\//, ''))
        window.addEventListener('popstate', onPop)
        return () => {
            window.removeEventListener('popstate', onPop)
            window.removeEventListener('load', onLoad)
        }
    }, [])

    const handleNavClick = (e, section) => {
        e.preventDefault()
        const id = ID_MAP[section.toLowerCase()] || ID_MAP['home']
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        // update URL (home -> '/')
        const path = section === 'home' ? '/' : `/${section}`
        window.history.pushState({}, '', path)
        setMenuOpen(false)
        setActive(section)
    }

    const navContent = (
        <ul onClick={(e) => e.stopPropagation()}>
            <li><a href="/" className={active === 'home' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
            <li><a href="/works" className={active === 'works' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'works')}>Works</a></li>
            <li><a href="/about" className={active === 'about' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
            <li><a href="/contact" className={active === 'contact' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
        </ul>
    )

    return (
        <div className="header">
            <div className="name">
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