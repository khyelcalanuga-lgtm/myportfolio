import React from 'react'
import './ResumeSection.css'
import cv from '../../assets/KhyelCalanugaCV.pdf'

const experienceData = [
    {
        date: 'May 2022 - June 2026',
        title: 'Freelance Graphic & 3D Designer',
        company: 'Yorik Production - Remote, Netherlands',
        description: 'Social media graphics, 3D product renders, branding collaterals',
    },
    {
        date: 'Apr - June 2026',
        title: 'Lead Developer',
        company: 'MRem Android App',
        description: 'Led development of a mobile application using Kotlin and Android SDK',
    },
    {
        date: 'Mar - May 2025',
        title: 'Customer Service Representative',
        company: 'Alorica - Marikina, NCR',
        description: 'Client communication and problem-solving under pressure',
    },
    {
        date: 'Oct - Nov 2024',
        title: 'Brand Marshall',
        company: 'SM Supermalls - San Mateo, Rizal',
        description: 'On-site brand representation and in-store promotions',
    },
]

const skillCategories = [
    {
        title: 'Design Tools',
        tags: ['Photoshop', 'Figma', 'Canva', 'Illustrator'],
    },
    {
        title: '3D',
        tags: ['Blender', 'Texturing', 'Lighting Setup', 'Product Rendering', 'Character Modeling'],
    },
    {
        title: 'Tech Stack',
        tags: ['React', 'JavaScript', 'Kotlin', 'Python', 'HTML', 'CSS', 'Vite', 'Node.js', 'TypeScript', 'PostgreSQL', 'MySQL', 'Git', 'REST APIs', 'Figma'],
    },
]

const ResumeSection = () => {
    return (
        <div className="resume-section">
            <div className="resume-container">
                <div className="resume-left" data-reveal>
                    <div className="about-block">
                        <span className="section-label">ABOUT ME</span>
                        <h1 className="name-heading">
                            Khyel M.<br />
                            Calanuga
                        </h1>
                        <div className="about-text">
                            <p>
                                Second-year BSIT student and freelance designer with experience in graphic
                                design, 3D, and app development. Passionate about combining design and
                                technology to create impactful visuals and applications.
                            </p>
                            <p>
                                Focused on quality visual design, product renders, branding, app
                                development, and delivering with strong attention to detail in every project.
                            </p>
                        </div>
                        <a href={cv} download className="download-cv-btn">Download CV</a>
                    </div>

                    <div className="experience-block">
                        <span className="section-label">EXPERIENCE</span>
                        <div className="timeline">
                            {experienceData.map((item, i) => (
                                <div key={i} className="timeline-item" data-reveal data-reveal-delay={String((i + 1) * 100)}>
                                    <div className="timeline-left">
                                        <span className="timeline-date">{item.date}</span>
                                    </div>
                                    <div className="timeline-right">
                                        <h3 className="timeline-title">{item.title}</h3>
                                        <span className="timeline-company">{item.company}</span>
                                        <p className="timeline-desc">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="resume-right" data-reveal data-reveal-delay="200">
                    <div className="skills-block">
                        <span className="section-label">SKILLS</span>
                        {skillCategories.map((cat, i) => (
                            <div key={i} className="skill-category" data-reveal data-reveal-delay={String((i + 1) * 100)}>
                                <h4 className="skill-category-title">{cat.title}</h4>
                                <div className="skill-tags">
                                    {cat.tags.map((tag, j) => (
                                        <span key={j} className="skill-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="info-card" data-reveal data-reveal-delay="300">
                        <p>
                            Currently completing a Bachelor of Science in Information Technology.
                            Open to full-time, part-time, and freelance work especially roles
                            that blend design and tech.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeSection
