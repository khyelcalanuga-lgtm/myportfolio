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
import PortfolioPreview from '../../assets/portfolio-preview.webp'
import YorikstudioPreview from '../../assets/yorikstudio-preview.webp'
import Clairo from '../../assets/illustration/clairo.webp'
import Rndm from '../../assets/illustration/rndm.webp'
import Rndm3 from '../../assets/illustration/rndm3.webp'
import Rrrr from '../../assets/illustration/rrrr.webp'
import MRemCover from '../../assets/Screenshot 2026-07-02 121814.png'

const projects = [
    {
        id: 20,
        title: 'Bugatti',
        category: '3D Render',
        description: 'Photorealistic · Blender',
        images: [Bugatti, Bugatti2, Bugatti3, Bugatti4, Bugatti5],
    },
    {
        id: 22,
        title: "Terre D'Hermes",
        category: '3D Render',
        description: 'Product Render · Blender',
        images: [TerreHermes, TerreHermes2, TerreHermes3, TerreHermes4],
    },
    {
        id: 21,
        title: 'Khyel',
        category: '3D Render',
        description: 'Product Render · Blender',
        images: [Khyel, Khyel2, Khyel3],
    },
    {
        id: 27,
        title: 'Cup',
        category: '3D Render',
        description: 'Product Render · Blender',
        images: [Cup, Cup2],
    },
    {
        id: 30,
        title: 'Room',
        category: '3D Render',
        description: 'Interior Render · Blender',
        images: [Room, Room2, Room3, Room4, Room5],
    },
    {
        id: 28,
        title: 'Portfolio Website',
        category: 'Web/App/UI',
        badge: 'WEBSITE',
        description: 'React · Vite · Personal Project',
        link: 'https://khyelcalanuga.vercel.app/',
        image: PortfolioPreview,
    },
    {
        id: 29,
        title: 'Yorik Studio',
        category: 'Web/App/UI',
        badge: 'WEBSITE',
        description: 'Agency Website · Freelance',
        link: 'https://yorikstudio.com/',
        image: YorikstudioPreview,
    },
    {
        id: 31,
        title: 'MRem',
        category: 'Web/App/UI',
        badge: 'APP',
        description: 'Android App · Kotlin · Lead Developer',
        image: MRemCover,
    },
    {
        id: 1,
        title: 'Fight Club',
        category: 'Graphic Design',
        description: 'Poster Design · Photoshop',
        image: FightClub,
    },
    {
        id: 2,
        title: 'Moon Knight',
        category: 'Graphic Design',
        description: 'Poster Design · Photoshop',
        image: MoonKnight,
    },
    {
        id: 3,
        title: 'Noah Schnapp Poster',
        category: 'Graphic Design',
        description: 'Poster Design · Photoshop',
        image: NoahSchnappPoster,
    },
    {
        id: 12,
        title: 'Burger 2',
        category: 'Graphic Design',
        description: 'Food Ad · Photoshop',
        image: Burger2,
    },
    {
        id: 14,
        title: 'Burger Combo',
        category: 'Graphic Design',
        description: 'Food Ad · Photoshop',
        image: BurgerCombo,
    },
    {
        id: 16,
        title: 'Praf Java Chip',
        category: 'Graphic Design',
        description: 'Beverage Ad · Photoshop',
        image: PrafJavaChip,
    },
    {
        id: 17,
        title: 'Royal Mismo',
        category: 'Graphic Design',
        description: 'Beverage Ad · Photoshop',
        image: RoyalMismo,
    },
    {
        id: 18,
        title: 'Straw Milk',
        category: 'Graphic Design',
        description: 'Beverage Ad · Photoshop',
        image: StrawMilk,
    },
    {
        id: 19,
        title: 'Tempura',
        category: 'Graphic Design',
        description: 'Food Ad · Photoshop',
        image: Tempura,
    },
    {
        id: 23,
        title: 'Clairo',
        category: 'Illustration',
        description: 'Digital Art · Photoshop',
        image: Clairo,
    },
    {
        id: 24,
        title: 'Random 1',
        category: 'Illustration',
        description: 'Digital Art · Photoshop',
        image: Rndm,
    },
    {
        id: 25,
        title: 'Random 2',
        category: 'Illustration',
        description: 'Digital Art · Photoshop',
        image: Rndm3,
    },
    {
        id: 26,
        title: 'Sketch',
        category: 'Illustration',
        description: 'Digital Art · Photoshop',
        image: Rrrr,
    },
]

const allCategories = ['3D Render', 'Web/App/UI', 'Graphic Design', 'Illustration']

const Portfoliocards = () => {
    const [activeCategory, setActiveCategory] = useState('3D Render')
    const [currentPage, setCurrentPage] = useState(1)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640)
    const [selectedImage, setSelectedImage] = useState(null)
    const [slideDir, setSlideDir] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const paginationRef = useRef(null)
    const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 })

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 640)
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    useEffect(() => {
        if (!selectedImage) return
        const handleKey = (e) => {
            if (e.key === 'Escape') setSelectedImage(null)
            if (e.key === 'ArrowLeft') goToPrev()
            if (e.key === 'ArrowRight') goToNext()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [selectedImage])

    const closePreview = () => setPreviewUrl(null)

    const openLightbox = (project) => {
        if (project.link) {
            setPreviewUrl(project.link)
            return
        }
        const images = project.images || (project.image ? [project.image] : [])
        if (!images.length) return
        setSelectedImage({ src: images[0], images, index: 0, title: project.title })
    }

    const goToPrev = () => {
        setSlideDir('right')
        setSelectedImage(prev => {
            if (!prev || prev.images.length <= 1) return prev
            const newIndex = prev.index === 0 ? prev.images.length - 1 : prev.index - 1
            return { ...prev, src: prev.images[newIndex], index: newIndex }
        })
    }

    const goToNext = () => {
        setSlideDir('left')
        setSelectedImage(prev => {
            if (!prev || prev.images.length <= 1) return prev
            const newIndex = prev.index === prev.images.length - 1 ? 0 : prev.index + 1
            return { ...prev, src: prev.images[newIndex], index: newIndex }
        })
    }

    const itemsPerPage = isMobile ? 2 : Infinity

    const filteredProjects = activeCategory
        ? projects.filter(p => p.category === activeCategory)
        : projects

    useLayoutEffect(() => {
        if (!paginationRef.current || !isMobile) return
        const active = paginationRef.current.querySelector('.pagination-btn.active')
        if (active) {
            setIndicatorStyle({
                opacity: 1,
                left: `${active.offsetLeft}px`,
                top: `${active.offsetTop}px`,
                width: `${active.offsetWidth}px`,
                height: `${active.offsetHeight}px`
            })
        }
    }, [currentPage, isMobile, filteredProjects.length])

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const displayedProjects = isMobile
        ? filteredProjects.slice(startIndex, startIndex + itemsPerPage)
        : filteredProjects

    const goToPage = (page) => setCurrentPage(page)

    const maxVisiblePages = 3
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
                            {project.images
                                ? <img src={project.images[0]} alt={project.title} className="card-img" loading="lazy" />
                                : project.image && <img src={project.image} alt={project.title} className="card-img" loading="lazy"
                                     style={project.id === 31 ? { objectPosition: 'left' } : undefined} />
                            }
                            <span className="card-category-badge">{project.badge || project.category}</span>
                            <div className="card-content">
                                <h3 className="card-title">{project.title}</h3>
                                <p className="card-description">{project.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isMobile && totalPages > 1 && (
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
                <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
                    <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                            <line x1="6" y1="6" x2="26" y2="26" />
                            <line x1="26" y1="6" x2="6" y2="26" />
                        </svg>
                    </button>
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
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            key={selectedImage.index}
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            className={slideDir ? `slide-${slideDir}` : ''}
                            onAnimationEnd={() => setSlideDir(null)}
                        />
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