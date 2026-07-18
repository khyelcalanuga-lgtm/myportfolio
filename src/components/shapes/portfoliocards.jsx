import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import './portfoliocards.css'
import FightClub from '../../assets/graphicdesigns/FightClub.webp'
import MoonKnight from '../../assets/graphicdesigns/MoonKnight.webp'
import NoahSchnappPoster from '../../assets/graphicdesigns/NoahSchnappPoster.webp'
import Burger2 from '../../assets/graphicdesigns/Burger2.webp'
import BurgerCombo from '../../assets/graphicdesigns/BurgerCombo.webp'
import Chococake from '../../assets/graphicdesigns/Chococake.webp'
import PrafJavaChip from '../../assets/graphicdesigns/PrafJavaChip.webp'
import RoyalMismo from '../../assets/graphicdesigns/RoyalMismo.webp'
import StrawMilk from '../../assets/graphicdesigns/StrawMilk.webp'
import Tempura from '../../assets/graphicdesigns/Tempura.webp'
import Bugatti from '../../assets/3dRenderss/Bugatti.webp'
import Bugatti2 from '../../assets/3dRenderss/Bugatti2.webp'
import Bugatti3 from '../../assets/3dRenderss/Bugatti3.webp'
import Bugatti4 from '../../assets/3dRenderss/Bugatti4.webp'
import Bugatti5 from '../../assets/3dRenderss/Bugatti5.webp'
import Khyel from '../../assets/3dRenderss/Khyel.webp'
import Khyel2 from '../../assets/3dRenderss/Khyel2.webp'
import Khyel3 from '../../assets/3dRenderss/Khyel3.webp'
import TerreHermes from "../../assets/3dRenderss/Terre D'Hermes.webp"
import TerreHermes2 from "../../assets/3dRenderss/Terre D'Hermes2.webp"
import TerreHermes3 from "../../assets/3dRenderss/Terre D'Hermes3.webp"
import TerreHermes4 from "../../assets/3dRenderss/Terre D'Hermes4.webp"
import Cup from '../../assets/3dRenderss/Cup.webp'
import Cup2 from '../../assets/3dRenderss/Cup2.webp'
import Room from '../../assets/3dRenderss/Room.webp'
import Room2 from '../../assets/3dRenderss/Room2.webp'
import Room3 from '../../assets/3dRenderss/Room3.webp'
import Room4 from '../../assets/3dRenderss/Room4.webp'
import Room5 from '../../assets/3dRenderss/Room5.webp'
import OneWishWillowColor from '../../assets/3dRenderss/onewishwillowcolor2.png'
import OneWishWillowClay from '../../assets/3dRenderss/onewishwillowclayrender.png'
import PortfolioPreview from '../../assets/portfolio-preview.webp'
import YorikstudioPreview from '../../assets/yorikstudio-preview.webp'
import Clairo from '../../assets/illustration/clairo.webp'
import Rndm from '../../assets/illustration/rndm.webp'
import Rndm3 from '../../assets/illustration/rndm3.webp'
import Rrrr from '../../assets/illustration/rrrr.webp'
import MRemCover from '../../assets/Screenshot 2026-07-02 121814.png'
import MREMM from '../../assets/MREMM.png'
import EyeSeePreview from '../../assets/eye-see-preview.png'

const projects = [
    {
        id: 20,
        title: 'Bugatti',
        category: '3D Render',
        short: 'Photorealistic · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A high-fidelity 3D recreation of the Bugatti Chiron in Blender, focusing on photorealistic quality through detailed geometry, carbon fiber textures, and layered metallic reflections. Multiple lighting setups highlight the car\'s sculpted body lines across five distinct angles.',
        images: [Bugatti, Bugatti2, Bugatti3, Bugatti4, Bugatti5],
    },
    {
        id: 22,
        title: "Terre D'Hermes",
        category: '3D Render',
        short: 'Product Render · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A sophisticated product visualization of the Terre d\'Hermès fragrance bottle in Blender, capturing light and glass interaction through precise refraction and anisotropic reflections. Studio lighting creates a premium editorial aesthetic across four compositions.',
        images: [TerreHermes, TerreHermes2, TerreHermes3, TerreHermes4],
    },
    {
        id: 32,
        title: 'One Wish Willow',
        category: '3D Render',
        short: 'Cinematic 3D · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A cinematic 3D prop render of the "One Wish Willow — Amaze Your Friends!" box from Obsession 2026, recreated in Blender with precise geometric folds and printed typography. Warm golden lighting and film grain create an intimate movie still atmosphere.',
        images: [OneWishWillowColor, OneWishWillowClay],
    },
    {
        id: 27,
        title: 'Cup',
        category: '3D Render',
        short: 'Product Render · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A minimalist product render of a ceramic cup in Blender using layered shaders with subsurface scattering for realistic light diffusion. Soft studio lighting creates gentle gradients across the rounded form in two complementary angles.',
        images: [Cup, Cup2],
    },
    {
        id: 30,
        title: 'Room',
        category: '3D Render',
        short: 'Interior Render · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A detailed interior architectural visualization in Blender featuring custom-modeled furniture, procedural textures, and natural daylight simulation. Five camera angles explore the living space from wide shots to intimate detail views.',
        images: [Room, Room2, Room3, Room4, Room5],
    },
    {
        id: 21,
        title: 'Khyel',
        category: '3D Render',
        short: 'Product Render · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A stylized 3D typography project with custom beveled letterforms and dramatic lighting in Blender. Brushed metal surfaces with three-point lighting create strong highlights and deep shadows across three angled shots.',
        images: [Khyel, Khyel2, Khyel3],
    },
    {
        id: 28,
        title: 'Portfolio Website',
        category: 'Web/App',
        badge: 'WEBSITE',
        short: 'React · Vite · Personal Project',
        tech: ['React', 'Vite', 'React Router', 'CSS'],
        description: 'A personal portfolio website built with React and Vite featuring a clean dark-themed interface with CSS animations and interactive elements. Includes a filterable project grid, image lightbox, and responsive layouts for all devices.',
        link: 'https://khyelcalanuga.dev/',
        image: PortfolioPreview,
    },
    {
        id: 29,
        title: 'Yorik Studio',
        category: 'Web/App',
        badge: 'WEBSITE',
        short: 'Agency Website · Freelance',
        tech: ['HTML', 'CSS', 'JavaScript'],
        description: 'A professional agency website for Yorik Studio with a bold, modern aesthetic featuring service showcases, portfolio sections, client testimonials, and a contact system. Built with semantic HTML and CSS focused on performance and accessibility.',
        link: 'https://yorikstudio.com/',
        image: YorikstudioPreview,
    },
    {
        id: 31,
        title: 'MRem',
        category: 'Web/App',
        badge: 'APP',
        short: 'Android App · Kotlin · Lead Developer',
        tech: ['Kotlin', 'Android', 'Material Design'],
        description: 'A full-featured Android medication reminder app built with Kotlin and Material Design. MRem stands for Medication Reminder, featuring real-time notifications, dosage tracking, and medication scheduling using MVVM architecture.',
        image: MREMM,
        images: [MRemCover],
    },
    {
        id: 33,
        title: 'Eye See',
        category: 'Web/App',
        badge: 'WEBSITE',
        short: 'Website · React · Brand Identity',
        tech: ['React', 'JavaScript', 'CSS', 'Vercel'],
        description: 'A clean, modern brand identity website built with React and deployed on Vercel. The site showcases a minimalist design approach with smooth animations, responsive layouts, and a focus on typography and visual hierarchy. Designed to establish a strong online presence with a professional aesthetic.',
        link: 'https://eye-see-kappa.vercel.app/',
        image: EyeSeePreview,
    },
    {
        id: 1,
        title: 'Fight Club',
        category: 'Graphic Design',
        short: 'Poster Design · Photoshop',
        tech: ['Photoshop'],
        description: 'A typographic poster inspired by Fight Club using grunge textures, distressed typography, and dark cinematic imagery in Photoshop. Layered text mirrors themes of identity and chaos with rough brush strokes and ink splatter effects.',
        image: FightClub,
    },
    {
        id: 2,
        title: 'Moon Knight',
        category: 'Graphic Design',
        short: 'Poster Design · Photoshop',
        tech: ['Photoshop'],
        description: 'A dramatic character poster of Moon Knight with chiaroscuro lighting and Egyptian-inspired motifs in Photoshop. The white costume contrasts against a dark background with gold crescent details and hieroglyphic textures.',
        image: MoonKnight,
    },
    {
        id: 3,
        title: 'Noah Schnapp Poster',
        category: 'Graphic Design',
        short: 'Poster Design · Photoshop',
        tech: ['Photoshop'],
        description: 'A cinematic fan poster for Noah Schnapp combining advanced portrait retouching with atmospheric color grading in Photoshop. Warm golden tones with teal shadows create a modern film poster aesthetic.',
        image: NoahSchnappPoster,
    },
    {
        id: 12,
        title: 'Burger 2',
        category: 'Graphic Design',
        short: 'Food Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A vibrant gourmet burger advertisement for social media using a dynamic diagonal layout with the burger as the hero element. Rich saturated colors make the ingredients pop against a dark background.',
        image: Burger2,
    },
    {
        id: 14,
        title: 'Burger Combo',
        category: 'Graphic Design',
        short: 'Food Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A high-energy combo meal advertisement showcasing a burger and fries with an explosive splash-style background and motion blur effects. Bold typography and vibrant colors create an appetite-stimulating call to action.',
        image: BurgerCombo,
    },
    {
        id: 16,
        title: 'Praf Java Chip',
        category: 'Graphic Design',
        short: 'Beverage Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A refreshing frappuccino advertisement with glossy condensation beads created through custom brush work and layer effects in Photoshop. Rich coffee browns blend with creamy whites in a centered, symmetrical layout.',
        image: PrafJavaChip,
    },
    {
        id: 17,
        title: 'Royal Mismo',
        category: 'Graphic Design',
        short: 'Beverage Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A luxury beverage advertisement with refined serif typography, gold foil textures, and sophisticated product placement in Photoshop. Soft warm lighting highlights the amber liquid and embossed label details.',
        image: RoyalMismo,
    },
    {
        id: 18,
        title: 'Straw Milk',
        category: 'Graphic Design',
        short: 'Beverage Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A playful strawberry milk advertisement using pastel pinks and creamy whites with fresh strawberries framing the glass bottle. Illustrator-style vector elements and hand-drawn typography add a whimsical touch.',
        image: StrawMilk,
    },
    {
        id: 19,
        title: 'Tempura',
        category: 'Graphic Design',
        short: 'Food Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A warm tempura advertisement celebrating Japanese street food culture with golden-brown shrimp and vegetables in an organic arrangement. Warm tones and directional lighting emphasize the crispy texture and authentic presentation.',
        image: Tempura,
    },
    {
        id: 23,
        title: 'Clairo',
        category: 'Illustration',
        short: 'Digital Art · Photoshop',
        tech: ['Photoshop'],
        description: 'A digital portrait illustration of Clairo using airbrush shading, soft blending, and vibrant colors in Photoshop. A dreamy atmosphere is achieved through soft light effects and a pastel-heavy color palette.',
        image: Clairo,
    },
    {
        id: 24,
        title: 'Random 1',
        category: 'Illustration',
        short: 'Digital Art · Photoshop',
        tech: ['Photoshop'],
        description: 'An expressive abstract digital illustration exploring experimental brushwork and bold color theory in Photoshop. Organic flowing shapes contrast with sharp geometric accents, creating dynamic tension between chaos and structure.',
        image: Rndm,
    },
    {
        id: 25,
        title: 'Random 2',
        category: 'Illustration',
        short: 'Digital Art · Photoshop',
        tech: ['Photoshop'],
        description: 'A surreal digital composition blending organic fluid forms with precise geometric elements using multiple blend modes and layer effects. Deep rich colors anchor the composition while bright accents guide the viewer\'s eye.',
        image: Rndm3,
    },
    {
        id: 26,
        title: 'Sketch',
        category: 'Illustration',
        short: 'Digital Art · Photoshop',
        tech: ['Photoshop'],
        description: 'A raw digital sketch capturing expressive line work and character design through loose, confident brush strokes in Photoshop. The monochrome palette with warm tones emphasizes gesture and movement over detailed rendering.',
        image: Rrrr,
    },
]

const allCategories = ['3D Render', 'Web/App', 'Graphic Design', 'Illustration']

const Portfoliocards = () => {
    const [activeCategory, setActiveCategory] = useState('3D Render')
    const [currentPage, setCurrentPage] = useState(1)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640)
    const [selectedImage, setSelectedImage] = useState(null)
    const [slideDir, setSlideDir] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [descExpanded, setDescExpanded] = useState(false)
    const [descTruncated, setDescTruncated] = useState(false)
    const [imageFullView, setImageFullView] = useState(false)
    const [fullViewFade, setFullViewFade] = useState('')
    const [lightboxClosing, setLightboxClosing] = useState(false)
    const closeTimerRef = useRef(null)
    const fadeTimerRef = useRef(null)
    const descRef = useRef(null)
    const paginationRef = useRef(null)
    const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 })

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 640)
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const closeLightbox = () => {
        if (lightboxClosing || !selectedImage) return
        if (fadeTimerRef.current) {
            clearTimeout(fadeTimerRef.current)
            fadeTimerRef.current = null
        }
        setFullViewFade('')
        setLightboxClosing(true)
        closeTimerRef.current = setTimeout(() => {
            setSelectedImage(null)
            setLightboxClosing(false)
            setImageFullView(false)
            closeTimerRef.current = null
        }, 200)
    }

    const toggleFullView = () => {
        if (fullViewFade) return
        setFullViewFade('fade-out')
        fadeTimerRef.current = setTimeout(() => {
            setImageFullView(v => !v)
            setFullViewFade('fade-in')
            fadeTimerRef.current = setTimeout(() => {
                setFullViewFade('')
                fadeTimerRef.current = null
            }, 120)
        }, 120)
    }

    // clean up timers on unmount
    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current)
            }
            if (fadeTimerRef.current) {
                clearTimeout(fadeTimerRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (!selectedImage) return
        const handleKey = (e) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') goToPrev()
            if (e.key === 'ArrowRight') goToNext()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [selectedImage])

    useEffect(() => {
        if (!selectedImage || !descRef.current || !isMobile) {
            setDescTruncated(false)
            return
        }
        requestAnimationFrame(() => {
            const el = descRef.current
            setDescTruncated(el.scrollHeight > el.clientHeight)
        })
    }, [selectedImage, isMobile])

    const closePreview = () => setPreviewUrl(null)

    const openLightbox = (project) => {
        const images = project.images || (project.image ? [project.image] : [])
        if (!images.length) return
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current)
            closeTimerRef.current = null
        }
        if (fadeTimerRef.current) {
            clearTimeout(fadeTimerRef.current)
            fadeTimerRef.current = null
        }
        setLightboxClosing(false)
        setFullViewFade('')
        setImageFullView(false)
        setSelectedImage({ src: images[0], images, index: 0, title: project.title, description: project.description, category: project.category, badge: project.badge, link: project.link, tech: project.tech })
        setDescExpanded(false)
    }

    const goToPrev = () => {
        setSlideDir(true)
        setSelectedImage(prev => {
            if (!prev || prev.images.length <= 1) return prev
            const newIndex = prev.index === 0 ? prev.images.length - 1 : prev.index - 1
            return { ...prev, src: prev.images[newIndex], index: newIndex }
        })
    }

    const goToNext = () => {
        setSlideDir(true)
        setSelectedImage(prev => {
            if (!prev || prev.images.length <= 1) return prev
            const newIndex = prev.index === prev.images.length - 1 ? 0 : prev.index + 1
            return { ...prev, src: prev.images[newIndex], index: newIndex }
        })
    }

    const itemsPerPage = isMobile ? 2 : 3

    const filteredProjects = activeCategory
        ? projects.filter(p => p.category === activeCategory)
        : projects

    // update indicator position/size based on the active button
    const updateIndicator = () => {
        const root = paginationRef.current
        if (!root) return
        const active = root.querySelector('.pagination-btn.active')
        if (active) {
            setIndicatorStyle({
                opacity: 1,
                left: `${active.offsetLeft}px`,
                top: `${active.offsetTop}px`,
                width: `${active.offsetWidth}px`,
                height: `${active.offsetHeight}px`
            })
        } else {
            setIndicatorStyle(prev => ({ ...prev, opacity: 0 }))
        }
    }

    useLayoutEffect(() => {
        updateIndicator()
        // ensure update runs after DOM updates
        const id = requestAnimationFrame(() => updateIndicator())
        return () => cancelAnimationFrame(id)
    }, [currentPage, isMobile, filteredProjects.length])

    // observe size changes in the pagination container so indicator can reposition
    useEffect(() => {
        if (!paginationRef.current) return
        const root = paginationRef.current
        const ro = new ResizeObserver(() => updateIndicator())
        ro.observe(root)
        window.addEventListener('resize', updateIndicator)
        return () => {
            ro.disconnect()
            window.removeEventListener('resize', updateIndicator)
        }
    }, [isMobile])

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const displayedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

    const goToPage = (page) => setCurrentPage(page)

    const maxVisiblePages = isMobile ? 3 : 5
    const pageNumbers = []
    const half = Math.floor(maxVisiblePages / 2)
    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, start + maxVisiblePages - 1)
    if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1)
    }
    for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="portfoliocards">
            <div className="portfolio-filters-row">
                {allCategories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => { setActiveCategory(cat); setCurrentPage(1) }}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="portfolio-grid">
                {displayedProjects.map((project, idx) => (
                    <div key={project.id} className="portfolio-card-wrap" data-reveal data-reveal-delay={String((idx % 6) * 100)}>
                        <div
                            className={`portfolio-card ${project.image || project.images ? 'has-image' : ''}`}
                            onClick={() => openLightbox(project)}
                            style={{ cursor: project.image || project.images ? 'pointer' : 'default' }}
                        >
                            {project.image
                                ? <img src={project.image} alt={project.title} className="card-img" loading="lazy"
                                    style={project.id === 31 ? { objectPosition: 'left' } : undefined} />
                                : project.images && <img src={project.images[0]} alt={project.title} className="card-img" loading="lazy" />
                            }
                            <span className="card-category-badge">{project.badge || project.category}</span>
                            <div className="card-content">
                                <h3 className="card-title">{project.title}</h3>
                                <p className="card-description">{project.short}</p>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="pagination" ref={paginationRef}>
                    <div className="pagination-indicator" style={indicatorStyle} />
                    <button
                        className={`pagination-btn arrow ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    {pageNumbers.map(num => (
                        <button
                            key={num}
                            className={`pagination-btn ${currentPage === num ? 'active' : ''}`}
                            onClick={() => goToPage(num)}
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        className={`pagination-btn arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            )}
            {selectedImage && createPortal(
                <div className={`lightbox-overlay${imageFullView ? ' full-image-overlay' : ''}${lightboxClosing ? ' closing' : ''}`} onClick={closeLightbox}>
                    {!imageFullView && (
                    <button className="lightbox-close" onClick={closeLightbox}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                            <line x1="6" y1="6" x2="26" y2="26" />
                            <line x1="26" y1="6" x2="6" y2="26" />
                        </svg>
                    </button>
                    )}
                    {selectedImage.images.length > 1 && (
                        <>
                            <button className="lightbox-arrow left" onClick={(e) => { e.stopPropagation(); goToPrev() }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                            <button className="lightbox-arrow right" onClick={(e) => { e.stopPropagation(); goToNext() }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                        </>
                    )}
                    <div className={`lightbox-content${imageFullView ? ' full-image' : ''}${fullViewFade ? ' ' + fullViewFade : ''}${lightboxClosing ? ' closing' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div className="lightbox-image-area" onClick={isMobile ? () => toggleFullView() : undefined}>
                            <div className="image-wrap">
                            <img
                                key={selectedImage.index}
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className={slideDir ? 'fade-in' : ''}
                                onAnimationEnd={() => setSlideDir(null)}
                            />
                            {isMobile && !imageFullView && (
                                <button className="expand-image-btn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                                </button>
                            )}
                            {isMobile && imageFullView && (
                                <button className="expand-image-btn collapse" onClick={(e) => { e.stopPropagation(); toggleFullView() }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
                                </button>
                            )}
                            </div>
                        </div>
                        {!imageFullView && (
                        <div className="lightbox-info">
                            <span className="lightbox-category-badge">{selectedImage.badge || selectedImage.category}</span>
                            <h2 className="lightbox-title">{selectedImage.title}</h2>
                            <p
                                ref={descRef}
                                className={`lightbox-desc${descExpanded ? ' expanded' : ''}`}
                            >
                                {selectedImage.description}
                            </p>
                            {isMobile && descTruncated && (
                                <button className="read-more-btn" onClick={() => setDescExpanded(v => !v)}>
                                    {descExpanded ? 'Show less' : 'Read more'}
                                </button>
                            )}
                            {selectedImage.tech && selectedImage.tech.length > 0 && (
                                <div className="tech-tags">
                                    {selectedImage.tech.map(t => (
                                        <span key={t} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                            )}
                            {selectedImage.link && (
                                <button className="view-website-btn" onClick={() => { setPreviewUrl(selectedImage.link); closeLightbox() }}>
                                    View Website
                                </button>
                            )}
                        </div>
                        )}
                    </div>
                    {selectedImage.images.length > 1 && (
                        <div className="lightbox-counter">{selectedImage.index + 1} / {selectedImage.images.length}</div>
                    )}
                </div>,
                document.body
            )}
            {previewUrl && createPortal(
                <div className="preview-overlay" onClick={closePreview}>
                    <div className="preview-container" onClick={(e) => e.stopPropagation()}>
                        <button className="preview-close" onClick={closePreview}>
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                                <line x1="6" y1="6" x2="26" y2="26" />
                                <line x1="26" y1="6" x2="6" y2="26" />
                            </svg>
                        </button>
                        <iframe src={previewUrl} className="preview-iframe" title="Website Preview" />
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}

export default Portfoliocards