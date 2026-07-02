import React from 'react';
import styles from './DownloadCVButton.module.css';
import cv from '../../assets/KhyelCalanugaCV.pdf'

const DownloadCVButton = () => {
  return (
    <a href={cv} download className={styles.button}>
      Download CV
    </a>
  );
};

export default DownloadCVButton;