import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Briefcase, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-950">
      <div className="container mx-auto">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="border-8 border-primary-200 dark:border-primary-900 rounded-2xl overflow-hidden transform -rotate-3 transition-transform hover:rotate-0 duration-300">
              <img 
                src="https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg" 
                alt="About me"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -right-5 -bottom-5 w-28 h-28 bg-white dark:bg-dark-800 rounded-lg shadow-xl p-4 flex items-center justify-center transform rotate-3">
              <span className="font-bold text-lg text-dark-900 dark:text-white">Based in<br/>Chennai</span>
            </div>
          </motion.div>
          
          <div>
            <motion.div variants={itemVariants}>
              <span className="inline-block py-1 px-3 rounded-full bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400 text-sm font-medium mb-4">
                About Me
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif">Aspiring Data Scientist with a passion for AI-driven solutions</h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-dark-600 dark:text-dark-300 mb-6 leading-relaxed"
            >
              Aspiring Data Scientist with hands-on experience in machine learning, computer vision, and data analysis. Skilled in end-to-end ML solution development with a strong foundation in Python, SQL, and statistical modeling.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-dark-600 dark:text-dark-300 mb-8 leading-relaxed"
            >
              Passionate about scalable AI for domains like geospatial and workplace analytics. Currently working as a Data Science Intern at VCODEZ, where I build regression models and deploy machine learning solutions.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
            >
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-dark-800 shadow-md text-center">
                <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                <h3 className="font-bold text-lg mb-1">Education</h3>
                <div className="text-center text-dark-500 dark:text-dark-400 text-sm">
                  <p>Data Science & AI, 360DigiTMG</p>
                  <p className="mt-1">BSc IT, Bharath College of Science and Management, Thanjavur</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-dark-800 shadow-md text-center">
                <Briefcase className="w-8 h-8 text-secondary-600 dark:text-secondary-400 mb-2" />
                <h3 className="font-bold text-lg mb-1">Experience</h3>
                <p className="text-center text-dark-500 dark:text-dark-400 text-sm">Data Science Intern</p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-dark-800 shadow-md text-center">
                <Award className="w-8 h-8 text-accent-500 dark:text-accent-400 mb-2" />
                <h3 className="font-bold text-lg mb-1">Projects</h3>
                <p className="text-center text-dark-500 dark:text-dark-400 text-sm">3+ Projects</p>
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
                <a href="tel:+919361688757" className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  +91 93616 88757
                </a>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-8">
              <a 
                href="https://docs.google.com/document/d/19lEuZEdTyYitRe2Lv17LLlBHLiHZ_mDp/edit?usp=sharing&ouid=112558413164205700415&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
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