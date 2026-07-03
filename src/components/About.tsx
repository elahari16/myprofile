import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Briefcase, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import DataFlowAnimation from './ui/DataFlowAnimation';
import DetectionFrame from './ui/DetectionFrame';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-secondary-50 to-primary-50 dark:from-dark-800 dark:to-dark-900 relative">
      <DataFlowAnimation />
      <div className="container mx-auto relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.div variants={itemVariants} className="text-center mb-6">
              <p className="text-lg text-dark-500 dark:text-dark-400 italic font-medium">
                "Graduated in tech, growing through data"
              </p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="relative max-w-lg mx-auto"
            >
              <DetectionFrame label="person" confidence="0.98" className="rounded-2xl">
                <div className="rounded-2xl overflow-hidden border border-primary-500/30 neon-border">
                  <img
                    src="/myprofile/my-profile.jpg"
                    alt="About me"
                    className="w-full h-full object-cover"
                  />
                </div>
              </DetectionFrame>
              <div className="absolute -right-3 -bottom-3 glass-card z-20 px-3 py-2 shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)]">
                <span className="font-mono text-sm font-bold text-primary-300 text-center block">Based in<br/>Chennai</span>
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div variants={itemVariants}>
              <span className="section-tag mb-4">// about_me</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif text-dark-900 dark:text-white">Computer Vision AI Developer building <span className="gradient-text">production AI-driven systems</span></h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-dark-600 dark:text-dark-300 mb-6 leading-relaxed"
            >
              Computer Vision AI Developer with hands-on experience building production real-time vision systems, machine learning, and data analysis. Skilled in end-to-end ML solution development with a strong foundation in Python, SQL, and statistical modeling.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-dark-600 dark:text-dark-300 mb-8 leading-relaxed"
            >
              Passionate about scalable AI for domains like geospatial and workplace analytics. Currently working as a Computer Vision AI Developer at Code Board Technologies, building production real-time computer-vision systems.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
            >
              <div className="flex flex-col items-center justify-center p-4 glass-card glass-card-hover text-center">
                <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                <h3 className="font-bold text-lg mb-1">Education</h3>
                <div className="text-center text-dark-500 dark:text-dark-400 text-sm">
                  <p>Data Science & AI, 360DigiTMG</p>
                  <p className="mt-1">BSc IT, Bharath College of Science and Management, Thanjavur</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 glass-card glass-card-hover text-center">
                <Briefcase className="w-8 h-8 text-secondary-600 dark:text-secondary-400 mb-2" />
                <h3 className="font-bold text-lg mb-1">Experience</h3>
                <p className="text-center text-dark-500 dark:text-dark-400 text-sm">Full-time CV Developer + Internships</p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 glass-card glass-card-hover text-center">
                <Award className="w-8 h-8 text-accent-500 dark:text-accent-400 mb-2" />
                <h3 className="font-bold text-lg mb-1">Projects</h3>
                <p className="text-center text-dark-500 dark:text-dark-400 text-sm">4+ Projects</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                <span className="text-dark-600 dark:text-dark-300">Chennai, Tamil Nadu</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                <a href="mailto:elahari16@gmail.com" className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  elahari16@gmail.com
                </a>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                <div className="flex flex-col space-y-1">
                  <a href="tel:+919361688757" className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    +91 93616 88757
                  </a>
                  <a href="tel:+916369506071" className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    +91 63695 06071
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-8">
              <a
                href="/Hariharan_Elangovan_Resume.docx"
                download="Hariharan_Elangovan_Resume.docx"
                className="btn-secondary"
              >
                Download Resume
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;