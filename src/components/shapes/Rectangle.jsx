import React from 'react'
import './Rectangle.css'

const Rectangle = () => {
  return (
    <div className="rectangle">
      <section className="section" data-reveal data-reveal-delay="100">
        <p className='tittle'>3+</p>
        <p className='description'>Years freelancing</p>
      </section>

      <section className="section" data-reveal data-reveal-delay="200">
        <p className='tittle'>4</p>
        <p className='description'>Design Principles</p>
      </section>

      <section className="section" data-reveal data-reveal-delay="300">
        <p className='tittle'>PH</p>
        <p className='description'>Based · Remote-ready</p>
      </section>
    </div >
  )
}

export default Rectangle
