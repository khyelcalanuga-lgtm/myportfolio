import { Routes, Route } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import Homepage from './pages/homepage.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import FloatingContact from './components/FloatingContact.jsx'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Analytics />
      <Header />
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
