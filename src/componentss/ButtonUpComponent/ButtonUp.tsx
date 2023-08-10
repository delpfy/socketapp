import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './ButtonUp.css'; // Создайте CSS-файл для стилизации

export default function ButtonUp  () {
    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
  
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <Fab
        className={`circle-button ${showButton ? 'show' : 'hide'}`}
        color="primary"
        aria-label="Scroll to top"
        onClick={scrollToTop}
      >
        ВГОРУ
      </Fab>
    );
};


