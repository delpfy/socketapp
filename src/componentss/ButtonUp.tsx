import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';


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

  const fabStyle = {
    position: 'fixed',
    bottom: showButton ? '10px' : '-60px', 
    left: '10px',
    width: '60px',
    height: '60px',
    backgroundColor: 'black',
    "&:hover" : {
      backgroundColor: 'black',
    },
    "&:unhover" : {
      backgroundColor: 'black'
    },
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'bottom 0.3s ease-in-out',
    zIndex: '1',
  };

  return (
    <Fab
      aria-label="Scroll to top"
      onClick={scrollToTop}
      sx={fabStyle}
      classes={{
        root: 'circle-button-root',
        focusVisible: 'circle-button-focus-visible',
      }}
    >
      ВГОРУ
    </Fab>
  );
};


