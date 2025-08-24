import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-primary-50 to-white dark:from-dark-800 dark:to-dark-900">
      <div className="container mx-auto">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-4 font-serif"
          >
            Let's Work Together
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-dark-600 dark:text-dark-300 max-w-2xl mx-auto"
          >
            I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to discuss data science projects or potential roles.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <a 
                  href="mailto:elahari16@gmail.com" 
                  className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  elahari16@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Phone</h3>
                <div className="space-y-1">
                  <div>
                    <a 
                      href="tel:+919361688757" 
                      className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      +91 93616 88757
                    </a>
                  </div>
                  <div>
                    <a 
                      href="tel:+916369506071" 
                      className="text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      +91 63695 06071
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Location</h3>
                <p className="text-dark-600 dark:text-dark-300">Chennai, Tamil Nadu</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex space-x-4 pt-4">
              <a 
                href="https://github.com/elahari16" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-dark-100 dark:bg-dark-800 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
              >
                <Github className="w-6 h-6 text-dark-600 dark:text-dark-300" />
              </a>
              <a 
                href="https://www.linkedin.com/in/hariharan-elangovan-b0162a23b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-dark-100 dark:bg-dark-800 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
              >
                <Linkedin className="w-6 h-6 text-dark-600 dark:text-dark-300" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              <button 
                type="submit"
                className="w-full btn-primary"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;