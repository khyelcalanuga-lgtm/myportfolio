import React from 'react';
import styles from './CategoryButton.module.css';

const CategoryButton = ({ children, active }) => {
    return (
        <button className={`${styles.button} ${active ? styles.active : ''}`}>
            {children}
        </button>
    );
};

export default CategoryButton;