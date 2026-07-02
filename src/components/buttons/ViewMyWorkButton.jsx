import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ViewMyWorkButton.module.css';

const ViewMyWorkButton = () => {
  return (
    <Link to="/Works" className={styles.button}>
      View my work
    </Link>
  );
};

export default ViewMyWorkButton;
