import React from 'react';
import { motion } from 'framer-motion';

const SkillsAnimation: React.FC = () => {
  const skills = ['Python', 'SQL', 'ML', 'AI', 'Data', 'Analytics'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-8">
      {skills.map((skill, index) => (
        <motion.div
          key={skill}
          className="absolute text-xs font-mono text-primary-300 dark:text-primary-600"
          style={{
            left: `${10 + index * 15}%`,
            top: `${20 + Math.sin(index) * 30}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut",
          }}
        >
          {skill}
        </motion.div>
      ))}
      
      {/* Code Brackets */}
      <motion.div
        className="absolute top-10 right-10 text-2xl font-mono text-accent-300 dark:text-accent-600"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        {'{ }'}
      </motion.div>
    </div>
  );
};

export default SkillsAnimation;