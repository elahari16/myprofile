import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ChevronRight, Award } from 'lucide-react';
import ProjectModal from './ui/ProjectModal';

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
    title: "Mini Social Media App with Toxic Comment Classification",
    category: "Machine Learning",
    imageUrl: "https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Built a mini social app with a toxic comment detection system. Integrated a logistic regression model to detect and filter toxic comments in real-time using Flask API. The system analyzes user comments and flags inappropriate content before it's posted.",
    technologies: ["Python", "Flask", "Node.js", "MongoDB", "Scikit-learn"],
    link: "https://github.com/elahari16/social_media_comment_classification"
  },
  {
    id: 2,
    title: "Workplace Activity Recognition System",
    category: "Computer Vision",
    imageUrl: "https://images.pexels.com/photos/7821702/pexels-photo-7821702.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Developed a computer vision-based real-time safety monitoring system for workplace environments. The system uses YOLO object detection to identify unsafe activities and equipment usage, sending alerts when safety protocols are violated.",
    technologies: ["YOLO", "OpenCV", "TensorFlow", "Streamlit", "Roboflow"],
    link: "https://github.com/elahari16/workplace-safety-cv",
    certificateLink: "https://drive.google.com/file/d/1K9Hkdvvruf0J_BE_zFXJS73OC_TR-rnv/view?usp=drive_link"
  },
  {
    id: 3,
    title: "Medical Product Supply Chain System",
    category: "Web Development",
    imageUrl: "https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Built a comprehensive medical inventory and distribution system with real-time order tracking. The platform connects medical suppliers with healthcare facilities, optimizing the supply chain and ensuring timely delivery of critical medical products.",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "jQuery"],
    link: "https://github.com/elahari16/medical-supply-chain"
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-50 dark:bg-dark-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            My Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">Featured Projects</h2>
          <p className="text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
            Explore a selection of my data science and machine learning projects, showcasing my expertise in AI and software development.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-primary-600 text-white dark:bg-primary-500' 
                  : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-dark-700'
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
              className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
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
                      className="text-xs py-1 px-2 rounded bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs py-1 px-2 rounded bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300">
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
                      aria-label={`Visit ${project.title} website`}
                      title="View Project"
                    >
                      <ExternalLink size={18} />
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