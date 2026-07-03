import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin cyan progress bar pinned to the very top of the viewport,
 * filling as the visitor scrolls the page — a subtle "processing" cue.
 */
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
