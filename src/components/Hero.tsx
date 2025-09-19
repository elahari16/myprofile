import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Eye } from 'lucide-react';
import profileImage from '/new profile .png';
import FloatingDataPoints from './ui/FloatingDataPoints';
import ThemeToggle from './ui/ThemeToggle';
import AvailabilityBanner from './ui/AvailabilityBanner';

const Hero: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const count = localStorage.getItem('visitorCount');
    if (count) {
      const newCount = parseInt(count) + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      setVisitorCount(newCount);
    } else {
      const newCount = Math.floor(Math.random() * 500) + 100; // Random starting number
      localStorage.setItem('visitorCount', newCount.toString());
      setVisitorCount(newCount);
    }
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-950 relative">
      <FloatingDataPoints />
      <div className="container mx-auto relative z-10">
        <AvailabilityBanner />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-lg font-medium mb-4">
              Hi, I'm Hariharan Elangovan
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight font-serif">
              Aspiring <span className="text-primary-600 dark:text-primary-400">Data Analytics</span> | <span className="text-secondary-600 dark:text-secondary-400">Data Scientist</span> | <span className="text-accent-500 dark:text-accent-400">Machine Learning Engineer</span> | <span className="text-accent-500 dark:text-accent-400">AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 mb-8 max-w-lg leading-relaxed">
              Passionate about building AI-driven solutions that solve real-world problems. Delivered 40% efficiency improvement in military training through MILTRANS AI translation system. Experienced in Python, ML, and computer vision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="/myprofile/Hariharan Elangovan DS.docx"
                download="Hariharan Elangovan DS.docx"
                className="btn-primary text-center"
              >
                📄 Download Resume
              </a>
              <a 
                href="#contact" 
                className="btn-secondary text-center"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                💬 Let's Talk
              </a>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/elahari16" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/hariharan-elangovan-b0162a23b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>

          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-80 sm:w-96 lg:w-[28rem] mx-auto lg:ml-0 lg:mr-auto">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img 
                  src={profileImage} 
                  alt="Hariharan Elangovan - Data Scientist"
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    console.log('Image failed to load:', e.currentTarget.src);
                    e.currentTarget.src = "https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                />
              </div>

              <div className="absolute -right-3 -bottom-3 lg:-right-5 lg:-bottom-5 w-16 h-16 lg:w-24 lg:h-24 bg-accent-400 rounded-full flex items-center justify-center text-white font-bold z-10">
                <span className="text-xs lg:text-sm">1+<br/>Years</span>
              </div>
              <div className="absolute -left-4 -top-4 lg:-left-6 lg:-top-6 w-16 h-16 lg:w-24 lg:h-24 bg-dark-100 dark:bg-dark-800 rounded-lg p-2 flex items-center shadow-xl z-10">
                <div className="flex flex-col">
                  <span className="text-xl lg:text-2xl font-bold text-primary-600 dark:text-primary-400">94%</span>
                  <span className="text-xs text-dark-600 dark:text-dark-300">ML Accuracy</span>
                </div>
              </div>

            </div>
            
            <div className="mt-8 lg:mt-0 lg:ml-8 font-mono text-xs sm:text-sm hidden lg:block">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
              >
                <div className="text-blue-600 dark:text-blue-400 mb-2">$ python ml_model.py</div>
                <div className="text-dark-700 dark:text-white mb-1">import pandas as pd</div>
                <div className="text-dark-700 dark:text-white mb-1">import numpy as np</div>
                <div className="text-dark-700 dark:text-white mb-1">from sklearn import *</div>
                <div className="text-dark-700 dark:text-white mb-3">from tensorflow import keras</div>
                <div className="text-yellow-600 dark:text-yellow-400 mb-2">Loading dataset...</div>
                <div className="text-cyan-600 dark:text-cyan-400 mb-2">Preprocessing data...</div>
                <div className="text-purple-600 dark:text-purple-400 mb-2">Training model...</div>
                <div className="text-orange-600 dark:text-orange-400 mb-2">Validating...</div>
                <div className="text-green-600 dark:text-green-400 mb-1">✓ Model training completed!</div>
                <div className="text-green-600 dark:text-green-400">✓ Accuracy: 94.2%</div>
              </motion.div>
            </div>

          </motion.div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-xl text-dark-500 dark:text-dark-400 italic font-bold mb-4">
            "Turning data into insights, algorithms into impact"
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Eye size={16} className="text-primary-600 dark:text-primary-400" />
            <span className="text-sm text-dark-500 dark:text-dark-400">
              {visitorCount} total visitors
            </span>
          </div>
          <div className="hidden md:flex flex-col items-center">
            <span className="text-sm text-dark-500 dark:text-dark-400 mb-2">Scroll Down</span>
            <motion.div
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <ArrowDown size={20} className="text-primary-600 dark:text-primary-400" />
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;