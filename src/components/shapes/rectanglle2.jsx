import React from 'react'
import './rectanglle2.css'

const Rectangle2 = () => {
    return (
        <div className='rec'>
            <div className="rec-grid">
                <section className="rec-item" data-reveal data-reveal-delay="100">
                    <svg className="rec-icon" width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4 10L21 12L17.4 14M17.4 10L12 13L6.6 10M17.4 10L21 8L12 3L3 8L6.6 10M6.6 10L3 12L6.6 14M17.4 14L21 16L12 21L3 16L6.6 14M17.4 14L12 17L6.6 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="rec-title">3D Product Rendering</p>
                    <p className="rec-desc">Photorealistic product renders for skincare, beverages,<br /> and packaging using Blender. Full lighting, texturing,<br /> and scene setup included.</p>
                </section>
                <section className="rec-item" data-reveal data-reveal-delay="200">
                    <svg className="rec-icon" width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="rec-title">Graphic Design</p>
                    <p className="rec-desc">Social media graphics, food ads, posters, brand<br /> collateral, and print materials. Clean, conversion-ready<br /> visuals for Instagram, Facebook, and beyond.</p>
                </section>
                <section className="rec-item" data-reveal data-reveal-delay="300">
                    <svg className="rec-icon" width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 20H16M12 20H8M12 20V16M12 16H5C4.44772 16 4 15.5523 4 15V6C4 5.44771 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6M12 16H19C19.5523 16 20 15.5523 20 15V10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p className="rec-title">UI/UX Design</p>
                    <p className="rec-desc">Wireframes, prototypes, and mobile interfaces using <br />Figma. Clean layouts optimized for real usability, not<br /> just aesthetics.</p>
                </section>
                <section className="rec-item" data-reveal data-reveal-delay="400">
                    <svg className="rec-icon" width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L3 12L9 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 6L21 12L15 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="rec-title">Web / App Development</p>
                    <p className="rec-desc">Fullstack web &amp; app development using React, Node.js,<br /> and modern frameworks. From database design to<br /> deployment across web and mobile platforms.</p>
                </section>
            </div>
        </div>
    )
}

export default Rectangle2