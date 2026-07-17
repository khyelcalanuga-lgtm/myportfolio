import React from 'react';
import styles from './ViewMyWorkButton.module.css';

const ViewMyWorkButton = () => {
  const handleClick = (e) => {
    e.preventDefault()
    const el = document.getElementById('works')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    window.history.pushState({}, '', '/works')
  }

  return (
    <a href="/works" className={styles.button} onClick={handleClick}>
      View my work
    </a>
  );
};

export default ViewMyWorkButton;
