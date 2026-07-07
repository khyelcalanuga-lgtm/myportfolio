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

const projects = [
    {
        id: 20,
        title: 'Bugatti',
        category: '3D Render',
        short: 'Photorealistic · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A high-fidelity 3D recreation of the Bugatti Chiron, meticulously modeled and rendered in Blender. The project focuses on achieving photorealistic quality through detailed geometry, accurate carbon fiber weave textures, and layered metallic reflections. Multiple lighting setups were used to highlight the car\'s sculpted body lines, from dramatic studio lighting to natural environment HDRIs. The final renders showcase the hypercar from five distinct angles, each emphasizing different aspects of the modeling and material work.',
        images: [Bugatti, Bugatti2, Bugatti3, Bugatti4, Bugatti5],
    },
    {
        id: 22,
        title: "Terre D'Hermes",
        category: '3D Render',
        short: 'Product Render · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A sophisticated product visualization of the iconic Terre d\'Hermès fragrance bottle, crafted entirely in Blender. The render captures the interplay between light and glass through precise refraction and transmission settings, while the gold metal cap and collar were built with realistic anisotropic reflections. The studio lighting setup uses soft key lights and rim lights to define the bottle\'s silhouette and create a premium, editorial aesthetic. Four different compositions explore various angles and environmental contexts for the luxury product.',
        images: [TerreHermes, TerreHermes2, TerreHermes3, TerreHermes4],
    },
    {
        id: 32,
        title: 'One Wish Willow',
        category: '3D Render',
        short: 'Cinematic 3D · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A cinematic 3D prop render of the triangular "One Wish Willow — Amaze Your Friends!" box from the movie Obsession 2026, recreated in Blender. The model captures the box\'s precise geometric folds and printed typography, set on a wooden bookshelf against a shallow depth-of-field backdrop of book spines. Warm golden lighting and subtle film grain create an intimate, film-like atmosphere, with the two compositions framed with cinematic letterbox bars to evoke a movie still aesthetic.',
        images: [OneWishWillowColor, OneWishWillowClay],
    },
    {
        id: 27,
        title: 'Cup',
        category: '3D Render',
        short: 'Product Render · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A minimalist product render of a ceramic cup that demonstrates advanced material techniques in Blender. The cup\'s glazed ceramic surface was built using layered shaders with realistic subsurface scattering that mimics how light penetrates and diffuses through the material. A subtle bump map adds microscopic surface imperfections for tactile realism, while the soft studio lighting creates gentle gradients across the rounded form. Two compositions present the cup from complementary angles, with careful attention to the rim thickness and handle curvature.',
        images: [Cup, Cup2],
    },
    {
        id: 30,
        title: 'Room',
        category: '3D Render',
        short: 'Interior Render · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A detailed interior architectural visualization rendered in Blender, featuring a thoughtfully designed living space. The scene includes custom-modeled furniture, procedural wall and floor textures, and a realistic lighting setup that simulates natural daylight entering through large windows. Each of the five camera angles explores a different part of the room, from wide establishing shots to intimate detail views of the decor. Post-processing in Blender\'s compositor added subtle color grading and atmospheric depth to enhance the mood.',
        images: [Room, Room2, Room3, Room4, Room5],
    },
    {
        id: 21,
        title: 'Khyel',
        category: '3D Render',
        short: 'Product Render · Blender',
        tech: ['Blender', 'Photoshop'],
        description: 'A stylized 3D typography project featuring the artist\'s name brought to life with custom beveled letterforms and dramatic lighting in Blender. Each letter was individually modeled with unique extrusions and edge detailing to create a cohesive yet varied visual identity. The surface materials combine brushed metal with subtle wear textures, while the three-point lighting setup creates strong highlights and deep shadows that give the letters a tangible, sculptural presence. The series includes three angled shots that reveal different facets of the typography.',
        images: [Khyel, Khyel2, Khyel3],
    },
    {
        id: 28,
        title: 'Portfolio Website',
        category: 'Web/App',
        badge: 'WEBSITE',
        short: 'React · Vite · Personal Project',
        tech: ['React', 'Vite', 'React Router', 'CSS'],
        description: 'A personal portfolio website designed and developed from scratch using React and Vite. The site features a clean, minimal dark-themed interface with smooth CSS animations and interactive elements that respond to user input. Built with a component-based architecture, the portfolio showcases projects across multiple categories with a filterable grid, image lightbox, and responsive layouts that adapt seamlessly from desktop to mobile. The design emphasizes typography and whitespace, letting the visual work take center stage.',
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
        description: 'A professional agency website developed for Yorik Studio, a creative services company. The project involved translating their brand identity into a fully responsive web experience with a bold, modern aesthetic. The site includes service showcases, portfolio sections, client testimonials, and a contact system, all built with clean semantic HTML and CSS. Special attention was given to performance optimization and accessibility, ensuring a fast, inclusive experience across all devices and browsers.',
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
        description: 'A full-featured Android application for managing rental properties and tenant communications, developed as the lead developer using Kotlin. The app follows Material Design guidelines with a clean, intuitive interface that makes property management tasks straightforward. Key features include real-time notifications, interactive dashboards, tenant profile management, and maintenance request tracking. The architecture follows modern Android development best practices with MVVM pattern, Room database for local storage, and Retrofit for API integration.',
        image: MREMM,
        images: [MRemCover],
    },
    {
        id: 1,
        title: 'Fight Club',
        category: 'Graphic Design',
        short: 'Poster Design · Photoshop',
        tech: ['Photoshop'],
        description: 'A typographic poster design inspired by the film Fight Club, created in Photoshop using a combination of grunge textures, distressed typography, and dark cinematic imagery. The composition features layered, fragmented text that mirrors the film\'s themes of identity and chaos, with rough brush strokes and ink splatter effects adding raw energy. A muted, desaturated color palette with hints of red and yellow creates a gritty, underground atmosphere. The final design balances aggressive textures with readable typography for maximum visual impact.',
        image: FightClub,
    },
    {
        id: 2,
        title: 'Moon Knight',
        category: 'Graphic Design',
        short: 'Poster Design · Photoshop',
        tech: ['Photoshop'],
        description: 'A dramatic character poster featuring Moon Knight, built in Photoshop with a focus on chiaroscuro lighting and Egyptian-inspired visual motifs. The composition centers on the character\'s striking white costume against a dark, moody background, with gold crescent details and hieroglyphic textures woven into the design. Multiple layer blending modes and custom brushes were used to create the ethereal glow effects and weathered stone textures. The poster captures the mysterious, supernatural tone of the character through careful color grading and symbolic imagery.',
        image: MoonKnight,
    },
    {
        id: 3,
        title: 'Noah Schnapp Poster',
        category: 'Graphic Design',
        short: 'Poster Design · Photoshop',
        tech: ['Photoshop'],
        description: 'A cinematic fan poster for Noah Schnapp created in Photoshop, combining advanced portrait retouching with atmospheric color grading. The portrait was carefully masked and layered to create depth, with soft rim lighting defining the subject\'s features against a textured background. The color palette leans into warm, golden tones with teal shadows for a modern film poster aesthetic. Minimalist typography anchors the layout, letting the portrait remain the focal point while maintaining a polished, professional finish.',
        image: NoahSchnappPoster,
    },
    {
        id: 12,
        title: 'Burger 2',
        category: 'Graphic Design',
        short: 'Food Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A vibrant food advertisement for a gourmet burger, designed in Photoshop for social media marketing. The composition uses a dynamic diagonal layout with the burger as the hero element, surrounded by scattered ingredients and bold typography. Rich, saturated colors make the beef patty, melted cheese, and fresh vegetables pop against a dark background. Careful food styling techniques were applied in post-processing, including localized contrast adjustments and selective sharpening to enhance textures and create an appetizing, crave-worthy look.',
        image: Burger2,
    },
    {
        id: 14,
        title: 'Burger Combo',
        category: 'Graphic Design',
        short: 'Food Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A high-energy combo meal advertisement showcasing a burger and crispy fries, created in Photoshop with a focus on dynamic composition and visual hierarchy. The layout uses an explosive, splash-style background with motion blur effects that convey speed and excitement. The burger and fries are arranged in a balanced diagonal flow that guides the eye across the entire design. Textural details were emphasized through dodge and burn techniques, while the bold typography and vibrant color scheme create an urgent, appetite-stimulating call to action.',
        image: BurgerCombo,
    },
    {
        id: 16,
        title: 'Praf Java Chip',
        category: 'Graphic Design',
        short: 'Beverage Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A refreshing beverage advertisement for Praf Java Chip frappuccino, designed in Photoshop to evoke cool, indulgent enjoyment. The drink is showcased with glossy condensation beads on the glass, created through custom brush work and layer effects that simulate moisture. Rich coffee browns blend with creamy whites and caramel accents, while ice cube details add authenticity and visual interest. The composition uses a centered, symmetrical layout with soft backlighting that makes the beverage glow, emphasizing its refreshing, treat-like quality.',
        image: PrafJavaChip,
    },
    {
        id: 17,
        title: 'Royal Mismo',
        category: 'Graphic Design',
        short: 'Beverage Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A luxury beverage advertisement for Royal Mismo, crafted in Photoshop with an elegant, premium aesthetic. The design features refined serif typography, subtle gold foil textures, and sophisticated product placement that positions the drink as a high-end choice. Soft, warm lighting wraps around the bottle, highlighting the liquid\'s rich amber color and the label\'s embossed details. The composition is clean and uncluttered with generous negative space, allowing each element to breathe and convey a sense of exclusivity and craftsmanship.',
        image: RoyalMismo,
    },
    {
        id: 18,
        title: 'Straw Milk',
        category: 'Graphic Design',
        short: 'Beverage Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A playful, cheerful strawberry milk advertisement designed in Photoshop with a soft, inviting visual style. The composition uses pastel pinks and creamy whites to create a gentle, approachable feel that appeals to a young audience. Fresh strawberries frame the glass bottle, their bright red color providing a natural pop against the soft background. Illustrator-style vector elements and hand-drawn typography add a whimsical, artisanal touch. The lighting is bright and airy, with subtle lens flare effects that suggest freshness and natural ingredients.',
        image: StrawMilk,
    },
    {
        id: 19,
        title: 'Tempura',
        category: 'Graphic Design',
        short: 'Food Ad · Photoshop',
        tech: ['Photoshop'],
        description: 'A warm, inviting tempura food advertisement created in Photoshop that celebrates Japanese street food culture. The composition centers on a basket of golden-brown tempura shrimp and vegetables, arranged in an organic, appetizing cluster. Warm golden tones and soft, directional lighting emphasize the crispy, crunchy texture of the batter, while a dark wooden tabletop provides contrast. Chopsticks, soy sauce dishes, and subtle Japanese pattern elements complete the authentic presentation, with careful color grading that evokes the cozy atmosphere of a traditional tempura shop.',
        image: Tempura,
    },
    {
        id: 23,
        title: 'Clairo',
        category: 'Illustration',
        short: 'Digital Art · Photoshop',
        tech: ['Photoshop'],
        description: 'A digital portrait illustration of Clairo created entirely in Photoshop, using a combination of airbrush shading, soft blending, and vibrant color choices. The illustration captures the singer\'s distinctive features through careful proportion study and expressive line work, with particular attention to the eyes and hair flow. A dreamy, ethereal atmosphere is achieved through soft light effects and a pastel-heavy color palette with complementary warm accents. The background uses abstract gradient shapes that echo the musical, free-spirited quality of her artistic style.',
        image: Clairo,
    },
    {
        id: 24,
        title: 'Random 1',
        category: 'Illustration',
        short: 'Digital Art · Photoshop',
        tech: ['Photoshop'],
        description: 'An expressive, abstract digital illustration created in Photoshop that explores experimental brushwork and bold color theory. The piece combines organic, flowing shapes with sharp geometric accents, creating a dynamic tension between chaos and structure. Custom brushes were developed to achieve unique texture effects, from spray-like splatters to smooth gradient transitions. The vibrant color palette mixes complementary hues with unexpected accent colors, while the layered composition invites the viewer to discover new details with each look.',
        image: Rndm,
    },
    {
        id: 25,
        title: 'Random 2',
        category: 'Illustration',
        short: 'Digital Art · Photoshop',
        tech: ['Photoshop'],
        description: 'A surreal digital composition in Photoshop that blends organic, fluid forms with precise geometric elements to create visual depth and intrigue. The piece uses multiple blend modes and layer effects to build complex textures that shift between digital and organic qualities. Deep, rich colors anchor the composition while bright accent tones create focal points that guide movement through the piece. The work explores themes of transformation and contrast, with each element carefully positioned to create a balanced yet surprising visual narrative.',
        image: Rndm3,
    },
    {
        id: 26,
        title: 'Sketch',
        category: 'Illustration',
        short: 'Digital Art · Photoshop',
        tech: ['Photoshop'],
        description: 'A raw, energetic digital sketch created in Photoshop that captures the fundamentals of expressive line work and character design. The piece showcases loose, confident brush strokes that define form through suggestion rather than detailed rendering, emphasizing gesture and movement over precision. The monochrome palette with subtle warm tones keeps the focus on the line quality and compositional structure. This work represents a more spontaneous, instinctive approach to digital art, valuing expression and flow over technical refinement.',
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