import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Eye, Cpu } from 'lucide-react';
import profileImage from '/new profile .png';
import NeuralBackground from './ui/NeuralBackground';
import DetectionFrame from './ui/DetectionFrame';
import TypingText from './ui/TypingText';

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
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-primary-50/40 to-white dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 overflow-hidden"
    >
      {/* layered backdrop: dot-grid + animated point cloud */}
      <div className="absolute inset-0 bg-detect-grid animate-grid-pan opacity-40 dark:opacity-60" />
      <NeuralBackground className="opacity-40 dark:opacity-70" density={80} />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white dark:from-dark-950/40 dark:to-dark-950" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* ---------- left: intro ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-5 font-mono text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary-400" />
              </span>
              <span className="text-secondary-300 uppercase tracking-[0.2em]">System online · Chennai, IN</span>
            </div>

            <span className="section-tag mb-4">
              <Cpu size={12} /> Hi, I'm Hariharan Elangovan
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight font-serif text-dark-900 dark:text-white">
              I build AI systems that <span className="gradient-text neon-text">see, track & understand</span> — in real time
            </h1>

            <div className="h-9 sm:h-10 mb-6">
              <TypingText
                phrases={[
                  'Computer Vision AI Developer',
                  'YOLO + BoT-SORT multi-camera tracking',
                  'Face recognition & re-identification',
                  'Python · FastAPI · Docker',
                ]}
                className="text-xl sm:text-2xl font-mono text-primary-300"
              />
            </div>

            <p className="text-base sm:text-lg text-dark-600 dark:text-dark-300 mb-8 max-w-lg leading-relaxed">
              Computer Vision AI Developer building production real-time multi-camera
              systems for identification and tracking. Strong foundation in Python, ML,
              and OCR/NLP. Also happy to help final-year students with their projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="/myprofile/Hariharan_Elangovan_Resume.docx"
                download="Hariharan_Elangovan_Resume.docx"
                className="btn-primary text-center"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="btn-secondary text-center"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Let's Talk
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
              <div className="flex items-center gap-2 ml-2 text-dark-500 dark:text-dark-400">
                <Eye size={16} className="text-primary-400" />
                <span className="text-sm font-mono">{visitorCount} visits</span>
              </div>
            </div>
          </motion.div>

          {/* ---------- right: detected portrait + telemetry ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-72 sm:w-96 lg:w-[26rem] animate-float">
              <DetectionFrame label="developer" confidence="0.99" className="rounded-2xl">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-primary-500/30 neon-border">
                  <img
                    src={profileImage}
                    alt="Hariharan Elangovan - Computer Vision AI Developer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                </div>
              </DetectionFrame>

              {/* floating telemetry chips */}
              <div className="absolute -right-3 -bottom-4 lg:-right-6 glass-card px-3 py-2 z-20 shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)]">
                <div className="text-lg lg:text-xl font-bold text-primary-300 font-mono leading-none">1+</div>
                <div className="text-[10px] uppercase tracking-wider text-dark-600 dark:text-dark-400">years exp</div>
              </div>
              <div className="absolute -left-4 -top-4 glass-card px-3 py-2 z-20">
                <div className="text-lg lg:text-xl font-bold text-secondary-300 font-mono leading-none">22</div>
                <div className="text-[10px] uppercase tracking-wider text-dark-600 dark:text-dark-400">languages · NLP</div>
              </div>
              <div className="absolute -left-6 top-1/2 hidden lg:block glass-card px-3 py-2 z-20">
                <div className="text-sm font-bold text-accent-400 font-mono leading-none">BoT-SORT</div>
                <div className="text-[10px] uppercase tracking-wider text-dark-600 dark:text-dark-400">tracker</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* tagline + scroll cue */}
        <div className="text-center mt-14">
          <p className="text-lg text-dark-600 dark:text-dark-400 italic font-medium mb-8">
            "Turning camera feeds into insights, models into impact."
          </p>
          <div className="hidden md:flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-dark-500 mb-2">Scroll Down</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowDown size={20} className="text-primary-400" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
