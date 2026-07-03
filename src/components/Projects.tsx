import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ChevronRight, Award } from 'lucide-react';
import ProjectModal from './ui/ProjectModal';
import ProjectsAnimation from './ui/ProjectsAnimation';

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  technologies: string[];
  link: string;
  certificateLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Workplace Activity Recognition System",
    category: "Computer Vision",
    imageUrl: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Computer vision-based safety monitoring system using YOLO object detection to identify unsafe activities and equipment usage, automatically sending alerts when safety protocols are violated. Demonstrated reliable detection of safety violations in testing with real-time processing.",
    technologies: ["YOLO", "OpenCV", "TensorFlow", "Streamlit", "Roboflow"],
    link: "https://github.com/elahari16/Workplace-activity-recognition-system",
    certificateLink: "https://drive.google.com/file/d/1K9Hkdvvruf0J_BE_zFXJS73OC_TR-rnv/view?usp=drive_link"
  },
  {
    id: 2,
    title: "MILTRANS: Context-Aware AI Translation Engine for Military Standard Operating Procedures",
    category: "Natural Language Processing (NLP) / Machine Learning",
    imageUrl: "/myprofile/icon/miltrans.png",
    description: "AI-powered multilingual SOP translation system for the Indian defense sector. Provides context-aware translation across 22 Indian languages from PDF, web, and image sources using NLP and OCR, with MongoDB Atlas integration.",
    technologies: ["Python", "NLP (Transformers, OCR)", "MongoDB Atlas", "Cloud Deployment"],
    link: "https://github.com/elahari16/MILTRANS-Context-Aware-AI-Translation-Engine-for-Military-Standard-Operating-Procedures",
    certificateLink: "/myprofile/certificates/project 2.pdf"
  },
  {
    id: 3,
    title: "Mini Social Media App with Toxic Comment Classification",
    category: "Machine Learning",
    imageUrl: "/myprofile/icon/toxic comment classification.png",
    description: "Mini social app with real-time toxic-comment filtering via a Flask ML API. Analyzes and flags inappropriate content before posting using a logistic regression model.",
    technologies: ["Python", "Flask", "Node.js", "MongoDB", "Scikit-learn"],
    link: "https://github.com/elahari16/social_media_comment_classification"
  },
  {
    id: 4,
    title: "Medical Product Supply Chain System",
    category: "Web Development",
    imageUrl: "https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Built a comprehensive medical inventory and distribution system with real-time order tracking. The platform connects medical suppliers with healthcare facilities, optimizing the supply chain and ensuring timely delivery of critical medical products.",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "jQuery"],
    link: "https://github.com/elahari16/Medical-products-supply-chain"
  },
  {
    id: 5,
    title: "Billing App for Fruit Shop",
    category: "App Development",
    imageUrl: "https://images.pexels.com/photos/19224085/pexels-photo-19224085.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "A React billing application for retail fruit shops that generates itemized bills on a custom letterhead and exports them as shareable/printable images, streamlining day-to-day checkout for small shop owners.",
    technologies: ["React", "Vite", "Tailwind CSS", "html2canvas"],
    link: "https://github.com/elahari16/-Billing-app-for-fruit-shop"
  }
];

const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter((project) => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-bl from-accent-50 to-secondary-50 dark:from-dark-900 dark:to-dark-800 relative">
      <ProjectsAnimation />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-tag mb-4">// my_work</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif text-dark-900 dark:text-white">Featured <span className="gradient-text">Projects</span></h2>
          <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
            A selection of my computer-vision, NLP and machine-learning work — ordered by relevance to data science and CV roles.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-2 px-4 rounded-full text-sm font-mono transition-all ${
                activeCategory === category
                  ? 'bg-primary-500 text-dark-950 font-semibold shadow-[0_0_16px_-2px_rgba(34,211,238,0.7)]'
                  : 'bg-dark-800/60 border border-primary-500/20 text-dark-300 hover:text-primary-300 hover:border-primary-400/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="glass-card glass-card-hover overflow-hidden group"
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                  <span className="text-white text-sm font-medium py-1 px-3 rounded-full bg-primary-600/80">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-dark-600 dark:text-dark-300 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs font-mono py-1 px-2 rounded bg-primary-500/10 border border-primary-500/25 text-primary-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs font-mono py-1 px-2 rounded bg-primary-500/10 border border-primary-500/25 text-primary-300">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-primary-600 dark:text-primary-400 font-medium flex items-center hover:underline"
                  >
                    View Details <ChevronRight size={16} className="ml-1" />
                  </button>
                  <div className="flex items-center space-x-2">
                    {project.certificateLink && (
                      <a
                        href={project.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-500 dark:text-accent-400 hover:text-accent-600 dark:hover:text-accent-300 transition-colors"
                        aria-label={`View certificate for ${project.title}`}
                        title="View Certificate"
                      >
                        <Award size={18} />
                      </a>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      aria-label={`View code for ${project.title}`}
                      title="View Code"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/elahari16" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View All Projects
          </a>
        </div>
      </div>
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;
