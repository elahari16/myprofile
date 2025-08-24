import React from 'react';
import { motion } from 'framer-motion';

const ProjectsAnimation: React.FC = () => {
  const codeLines = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    width: Math.random() * 60 + 20,
    delay: i * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-8">
      {/* Floating Code Blocks */}
      <div className="absolute top-20 right-20">
        {codeLines.map((line) => (
          <motion.div
            key={line.id}
            className="bg-primary-400/20 dark:bg-primary-400/10 h-1 mb-2 rounded"
            style={{ width: `${line.width}px` }}
            animate={{
              width: [`${line.width}px`, `${line.width + 20}px`, `${line.width}px`],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: line.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Binary Rain */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xs font-mono text-secondary-300 dark:text-secondary-600"
          style={{ left: `${10 + i * 12}%` }}
          animate={{
            y: [-50, window.innerHeight + 50],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsAnimation;