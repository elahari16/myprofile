import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Boxes, Radar, Server, Video, ArrowRight, Target, Wrench, Layers } from 'lucide-react';

const pipeline = [
  { icon: <Camera className="w-5 h-5" />, label: 'Multi-camera feeds' },
  { icon: <Boxes className="w-5 h-5" />, label: 'YOLO detection' },
  { icon: <Radar className="w-5 h-5" />, label: 'BoT-SORT tracking' },
  { icon: <Server className="w-5 h-5" />, label: 'FastAPI · WebSocket' },
  { icon: <Video className="w-5 h-5" />, label: 'Frigate · Docker' },
];

const blocks = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'The problem',
    body: 'Identify and track residents in real time across many overlapping cameras in an apartment/campus — without losing identity as people move between camera views.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'My approach',
    body: 'Face enrollment + recognition pipelines feed a YOLO detector and a BoT-SORT tracker. A FastAPI/WebSocket backend streams live results; the whole stack is containerised with Docker and integrated with Frigate.',
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: 'Hardest part',
    body: 'Cutting identity switches when people cross between overlapping cameras. I tuned overlap and ID-lock thresholds so the same person keeps one ID across the camera network.',
  },
];

const CaseStudy: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="case-study" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-50 dark:bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-detect-grid opacity-30" />
      <div className="container mx-auto relative z-10" ref={ref}>
        <div className="text-center mb-12">
          <span className="section-tag mb-4">// flagship_project</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif text-dark-900 dark:text-white">
            Real-Time <span className="gradient-text">Multi-Camera Tracking</span>
          </h2>
          <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
            My current work at Code Board Technologies — a production computer-vision system for
            resident identification and tracking.
          </p>
        </div>

        {/* Pipeline diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 mb-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-2">
            {pipeline.map((step, i) => (
              <React.Fragment key={step.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                  className="flex flex-col items-center gap-2 w-28 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/40 flex items-center justify-center text-primary-300">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono text-dark-600 dark:text-dark-300 leading-tight">{step.label}</span>
                </motion.div>
                {i < pipeline.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-primary-500/60 hidden sm:block shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Problem / approach / challenge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              className="glass-card glass-card-hover p-6"
            >
              <div className="w-12 h-12 rounded-full bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-300 mb-4">
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2">{b.title}</h3>
              <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
