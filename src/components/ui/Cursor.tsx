import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    // Check if we should use custom cursor (not on touch devices)
    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    if (isTouchDevice()) {
      setHidden(true);
      return;
    }
    
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };
    
    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };
    
    const onMouseEnter = () => {
      setHidden(false);
    };
    
    const onMouseLeave = () => {
      setHidden(true);
    };
    
    const onMouseDown = () => {
      setClicked(true);
    };
    
    const onMouseUp = () => {
      setClicked(false);
    };
    
    // Track link and button hovers
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .social-link').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };
    
    addEventListeners();
    handleLinkHoverEvents();
    
    return () => {
      removeEventListeners();
    };
  }, []);
  
  if (hidden) return null;
  
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary-500 dark:border-primary-400 z-[9999] pointer-events-none"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: hidden ? 0 : 1,
          borderColor: linkHovered ? 'rgba(14, 165, 233, 0.5)' : 'rgba(14, 165, 233, 1)',
        }}
        transition={{
          type: 'tween',
          duration: 0.1,
          ease: 'easeOut',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full z-[9999] pointer-events-none"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 1.2 : 1,
          opacity: hidden ? 0 : linkHovered ? 0 : 1,
        }}
        transition={{
          type: 'tween',
          duration: 0.08,
          ease: 'easeOut',
        }}
      />
    </>
  );
};

export default Cursor;