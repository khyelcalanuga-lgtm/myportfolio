import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import Homepage from './pages/homepage.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import FloatingContact from './components/FloatingContact.jsx'
import './App.css'

const ScrollToSection = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const raw = pathname === '/' ? 'home' : pathname.slice(1)
    const toId = { Home: 'home', Works: 'works', About: 'About', Contact: 'contact' }
    const id = toId[raw] || raw
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [pathname])

  return null
}

const App = () => {
  return (
    <div className="app">
      <Analytics />
      <Header />
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/Works" element={<Homepage />} />
        <Route path="/About" element={<Homepage />} />
        <Route path="/Contact" element={<Homepage />} />
      </Routes>
      <Footer />
      <FloatingContact />
    </div>
  )
}

export default App
