import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import profileImage from '/my-profile.jpg';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-primary-50 dark:from-dark-900 dark:to-dark-950">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
              Hi, I'm Hariharan Elangovan
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight font-serif">
              Aspiring <span className="text-primary-600 dark:text-primary-400">Data Scientist</span> | <span className="text-secondary-600 dark:text-secondary-400">Machine Learning Engineer</span> | <span className="text-accent-500 dark:text-accent-400">AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 mb-8 max-w-lg leading-relaxed">
              Passionate about building AI-driven solutions that solve real-world problems. Experienced in machine learning, computer vision, and data analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="https://docs.google.com/document/d/19lEuZEdTyYitRe2Lv17LLlBHLiHZ_mDp/export?format=pdf"
                download="Hariharan_Elangovan_CV.pdf"
                className="btn-primary"
              >
                Download CV
              </a>
              <a 
                href="#contact" 
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
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
            <div className="relative w-72 sm:w-80 lg:w-96 mx-auto lg:ml-auto lg:mr-0">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 p-1">
                <img 
                  src={profileImage} 
                  alt="Hariharan Elangovan - Data Scientist"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    console.log('Image failed to load:', e.currentTarget.src);
                    e.currentTarget.src = "https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                />
              </div>
              <div className="absolute -right-3 -bottom-3 lg:-right-5 lg:-bottom-5 w-16 h-16 lg:w-24 lg:h-24 bg-accent-400 rounded-full flex items-center justify-center text-white font-bold z-10">
                <span className="text-xs lg:text-sm">1+<br/>Years</span>
              </div>
              <div className="absolute -left-4 -top-4 lg:-left-8 lg:-top-8 w-20 h-20 lg:w-32 lg:h-32 bg-dark-100 dark:bg-dark-800 rounded-lg p-2 flex items-center shadow-xl z-10">
                <div className="flex flex-col">
                  <span className="text-2xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400">3+</span>
                  <span className="text-xs lg:text-sm text-dark-600 dark:text-dark-300">Projects</span>
                </div>
              </div>

            </div>
            <div className="mt-2 text-center">
              <p className="text-sm text-dark-500 dark:text-dark-400 italic font-medium">
                "Graduated in tech, growing through data"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center">
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
    </section>
  );
};

export default Hero;