import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GetInTouchButton.module.css';

const GetInTouchButton = () => {
  return (
    <Link to="/Contact" className={styles.button}>
      Get in touch
    </Link>
  );
};

export default GetInTouchButton;
