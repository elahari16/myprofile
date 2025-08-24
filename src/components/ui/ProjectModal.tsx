import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  technologies: string[];
  link: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative bg-white dark:bg-dark-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-dark-100 dark:bg-dark-700 hover:bg-dark-200 dark:hover:bg-dark-600 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={20} className="text-dark-800 dark:text-dark-200" />
          </button>
          
          <div className="relative aspect-video">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent flex items-end">
              <div className="p-6">
                <span className="inline-block py-1 px-3 rounded-full bg-primary-600/80 text-white text-sm font-medium mb-2">
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{project.title}</h3>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h4 className="text-xl font-bold mb-4 font-serif">Project Overview</h4>
            <p className="text-dark-600 dark:text-dark-300 mb-6">
              {project.description}
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3 font-serif">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="text-sm py-1 px-3 rounded-full bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary flex items-center"
              >
                View Live <ExternalLink size={16} className="ml-2" />
              </a>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary flex items-center"
              >
                View Code <Github size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;