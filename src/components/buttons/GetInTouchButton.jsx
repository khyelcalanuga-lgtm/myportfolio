import React from 'react';
import styles from './GetInTouchButton.module.css';

const GetInTouchButton = () => {
  const handleClick = (e) => {
    e.preventDefault()
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    window.history.pushState({}, '', '/contact')
  }

  return (
    <a href="/contact" className={styles.button} onClick={handleClick}>
      Get in touch
    </a>
  );
};

export default GetInTouchButton;
