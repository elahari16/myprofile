import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const neurons = [
    { id: 0, x: 50, y: 30, layer: 'input' },
    { id: 1, x: 50, y: 50, layer: 'input' },
    { id: 2, x: 50, y: 70, layer: 'input' },
    { id: 3, x: 150, y: 25, layer: 'hidden' },
    { id: 4, x: 150, y: 45, layer: 'hidden' },
    { id: 5, x: 150, y: 65, layer: 'hidden' },
    { id: 6, x: 150, y: 85, layer: 'hidden' },
    { id: 7, x: 250, y: 40, layer: 'output' },
    { id: 8, x: 250, y: 60, layer: 'output' }
  ];

  const connections = [
    { from: 0, to: 3 }, { from: 0, to: 4 }, { from: 0, to: 5 }, { from: 0, to: 6 },
    { from: 1, to: 3 }, { from: 1, to: 4 }, { from: 1, to: 5 }, { from: 1, to: 6 },
    { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }, { from: 2, to: 6 },
    { from: 3, to: 7 }, { from: 3, to: 8 },
    { from: 4, to: 7 }, { from: 4, to: 8 },
    { from: 5, to: 7 }, { from: 5, to: 8 },
    { from: 6, to: 7 }, { from: 6, to: 8 }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-900 dark:to-dark-800 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo/Name */}
        <motion.h1 
          className="text-4xl font-bold font-serif text-primary-600 dark:text-primary-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hariharan Elangovan
        </motion.h1>

        {/* Neural Network */}
        <div className="relative w-80 h-40 mx-auto mb-8">
          <svg className="w-full h-full" viewBox="0 0 300 100">
            {/* Connections */}
            {connections.map((conn, index) => {
              const fromNeuron = neurons[conn.from];
              const toNeuron = neurons[conn.to];
              return (
                <motion.line
                  key={index}
                  x1={fromNeuron.x}
                  y1={fromNeuron.y}
                  x2={toNeuron.x}
                  y2={toNeuron.y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary-400 dark:text-primary-500"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 0.6, pathLength: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                />
              );
            })}
            
            {/* Neurons */}
            {neurons.map((neuron, index) => (
              <motion.circle
                key={neuron.id}
                cx={neuron.x}
                cy={neuron.y}
                r="6"
                className={`fill-current ${
                  neuron.layer === 'input' ? 'text-secondary-500' :
                  neuron.layer === 'hidden' ? 'text-primary-500' :
                  'text-accent-500'
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              />
            ))}
            
            {/* Pulsing signals */}
            {connections.slice(0, 3).map((conn, index) => {
              const fromNeuron = neurons[conn.from];
              const toNeuron = neurons[conn.to];
              return (
                <motion.circle
                  key={`signal-${index}`}
                  r="2"
                  className="fill-yellow-400"
                  animate={{
                    cx: [fromNeuron.x, toNeuron.x],
                    cy: [fromNeuron.y, toNeuron.y],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.5 + 1,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </svg>
          
          {/* Layer Labels */}
          <div className="absolute -bottom-6 left-8 text-xs text-dark-500 dark:text-dark-400">Input</div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-dark-500 dark:text-dark-400">Hidden</div>
          <div className="absolute -bottom-6 right-8 text-xs text-dark-500 dark:text-dark-400">Output</div>
        </div>

        {/* Loading Text */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="text-lg font-semibold text-dark-700 dark:text-dark-200">Neural Network Loading...</div>
          <div className="text-sm text-dark-500 dark:text-dark-400">Initializing AI Portfolio</div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;