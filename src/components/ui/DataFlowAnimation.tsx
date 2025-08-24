import React from 'react';
import { motion } from 'framer-motion';

const DataFlowAnimation: React.FC = () => {
  const dataPoints = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="w-full h-full">
        {/* Data Flow Path */}
        <motion.path
          d="M 0,50 Q 25,20 50,50 T 100,50"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-primary-400"
          strokeDasharray="5,5"
          animate={{
            strokeDashoffset: [0, -20],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Flowing Data Points */}
        {dataPoints.map((point) => (
          <motion.circle
            key={point.id}
            r="3"
            className="fill-secondary-400"
            animate={{
              cx: ["0%", "100%"],
              cy: ["50%", "30%", "50%", "70%", "50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: point.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default DataFlowAnimation;