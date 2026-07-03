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
      {/* Detection reticle — square brackets that "lock on" when hovering links */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        animate={{
          x: position.x - 14,
          y: position.y - 14,
          scale: clicked ? 0.8 : linkHovered ? 1.4 : 1,
          opacity: hidden ? 0 : 1,
          rotate: linkHovered ? 45 : 0,
        }}
        transition={{ type: 'tween', duration: 0.12, ease: 'easeOut' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M2 9V2h7" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
          <path d="M26 9V2h-7" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
          <path d="M2 19v7h7" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
          <path d="M26 19v7h-7" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
      {/* center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary-300 rounded-full z-[9999] pointer-events-none shadow-[0_0_8px_rgba(34,211,238,0.9)]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: clicked ? 1.6 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: 'tween', duration: 0.08, ease: 'easeOut' }}
      />
    </>
  );
};

export default Cursor;