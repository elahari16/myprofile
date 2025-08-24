import React from 'react';
import { motion } from 'framer-motion';

const FloatingDataPoints: React.FC = () => {
  const neurons = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 3,
  }));

  const synapses = [
    { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
    { from: 3, to: 4 }, { from: 0, to: 5 }, { from: 5, to: 6 },
    { from: 6, to: 7 }, { from: 1, to: 8 }, { from: 8, to: 9 },
    { from: 4, to: 10 }, { from: 7, to: 11 }, { from: 9, to: 12 },
    { from: 10, to: 13 }, { from: 11, to: 14 }, { from: 12, to: 13 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      <svg className="w-full h-full">
        {/* Synaptic Connections */}
        {synapses.map((synapse, index) => {
          const fromNeuron = neurons[synapse.from];
          const toNeuron = neurons[synapse.to];
          if (!fromNeuron || !toNeuron) return null;
          
          return (
            <motion.line
              key={index}
              x1={`${fromNeuron.x}%`}
              y1={`${fromNeuron.y}%`}
              x2={`${toNeuron.x}%`}
              y2={`${toNeuron.y}%`}
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary-400 dark:text-primary-500"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                strokeWidth: [1, 2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut",
              }}
            />
          );
        })}
        
        {/* Neural Impulses */}
        {synapses.map((synapse, index) => {
          const fromNeuron = neurons[synapse.from];
          const toNeuron = neurons[synapse.to];
          if (!fromNeuron || !toNeuron) return null;
          
          return (
            <motion.circle
              key={`impulse-${index}`}
              r="2"
              className="fill-accent-400 dark:fill-accent-300"
              animate={{
                cx: [`${fromNeuron.x}%`, `${toNeuron.x}%`],
                cy: [`${fromNeuron.y}%`, `${toNeuron.y}%`],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.4,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
      
      {/* Neurons */}
      {neurons.map((neuron) => (
        <motion.div
          key={neuron.id}
          className="absolute bg-secondary-400/60 dark:bg-secondary-300/40 rounded-full"
          style={{
            left: `${neuron.x}%`,
            top: `${neuron.y}%`,
            width: `${neuron.size}px`,
            height: `${neuron.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: neuron.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingDataPoints;