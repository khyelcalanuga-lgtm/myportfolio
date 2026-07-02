import React, { useState } from 'react'
import './ContactSection.css'
import DotPattern from '../backgrounds/DotPattern'

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="#9b9b9b" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <line x1="8" y1="11" x2="8" y2="17" />
    <line x1="8" y1="7" x2="8" y2="7.01" />
    <line x1="12" y1="17" x2="12" y2="11" />
    <line x1="16" y1="17" x2="16" y2="13" />
    <line x1="12" y1="11" x2="16" y2="11" />
  </svg>
)

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)

const ArrowDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const contactLinks = [
  { href: 'mailto:khyelcalanuga@gmail.com', icon: <MailIcon />, text: 'khyelcalanuga@gmail.com' },
  { href: 'https://www.instagram.com/kahyelll/', icon: <InstagramIcon />, text: '@kahyelll' },
  { href: 'https://www.linkedin.com/in/khyel-calanuga-928167371/', icon: <LinkedInIcon />, text: 'Khyel Calanuga - LinkedIn' },
  { href: 'https://github.com/khyelcalanuga-lgtm', icon: <GithubIcon />, text: 'github.com/khyelcalanuga-lgtm' },
]

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    data.append('_captcha', 'false')
    data.append('_template', 'table')

    await fetch('https://formsubmit.co/ajax/khyelcalanuga@gmail.com', {
      method: 'POST',
      body: data,
    })

    setSubmitted(true)
    form.reset()
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="contact-section" id="contact">
      <DotPattern />
      <div className="contact-container">
        <div className="contact-left" data-reveal>
          <span className="contact-label">WORK WITH ME</span>
          <h2 className="contact-heading">Get in touch</h2>
          <p className="contact-desc">
            Open for freelance, full-time, and internship opportunities. Usually respond within 24 hours.
          </p>
          <div className="contact-links">
            {contactLinks.map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="contact-link" data-reveal data-reveal-delay={String((i + 1) * 100)}>
                {link.icon}
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="contact-right" data-reveal data-reveal-delay="200">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Your Name</label>
              <div className="input-wrapper">
                <input id="name" name="name" type="text" placeholder="Juan dela Cruz" required />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input id="email" name="email" type="email" placeholder="juan@company.com" required />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="service">What do you need?</label>
              <div className="select-wrapper">
                <select id="service" name="service">
                  <option value="" disabled selected>Select a service</option>
                  <option value="website-design">Website Design</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="3d-rendering">3D Rendering</option>
                  <option value="app-development">App Development</option>
                  <option value="development">Web Development</option>
                  <option value="other">Other</option>
                </select>
                <ArrowDownIcon />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <div className="input-wrapper">
                <textarea id="message" name="message" rows="5" placeholder="Tell me about your project" required />
              </div>
            </div>
            <button type="submit" className="send-btn">Send message</button>
          </form>
          {submitted && <div className="toast">✓ Message sent!</div>}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
