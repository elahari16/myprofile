import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Data Science Intern",
    company: "VCODEZ",
    location: "Chennai, India",
    period: "Mar 2025 - Present",
    description: [
      "Building regression models for predictive analytics applications",
      "Deploying machine learning solutions using Flask",
      "Participating in client meetings to understand requirements and present solutions"
    ],
    technologies: ["Python", "Scikit-learn", "Flask", "Pandas", "NumPy", "Git"]
  },
  {
    id: 2,
    role: "Data Science Intern",
    company: "360DigiTMG",
    location: "Chennai, India",
    period: "Jun 2024 - Mar 2025",
    description: [
      "Developed computer vision models using YOLO and OpenCV for workplace safety analytics",
      "Implemented image processing techniques for real-time object detection",
      "Improved safety compliance monitoring, resulting in increased customer satisfaction"
    ],
    technologies: ["Python", "OpenCV", "YOLO", "TensorFlow", "Streamlit", "Roboflow"]
  }
];

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-50 dark:bg-dark-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            Work Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">Professional Journey</h2>
          <p className="text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
            My professional experience in data science and machine learning roles.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary-200 dark:bg-primary-800"></div>
            
            {/* Experience items */}
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                variants={itemVariants}
                className={`relative mb-12 md:mb-24 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-auto md:mr-1/2' : 'md:pl-12 md:ml-1/2'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 border-4 border-white dark:border-dark-900"></div>
                
                <div className={`bg-white dark:bg-dark-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <span className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 mt-2 md:mt-0">
                      <Calendar size={16} className="mr-1" /> {exp.period}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                    <span className="flex items-center text-dark-700 dark:text-dark-300 font-medium">
                      <Briefcase size={16} className="mr-1 text-secondary-600 dark:text-secondary-400" /> {exp.company}
                    </span>
                    <span className="hidden sm:inline text-dark-400">•</span>
                    <span className="flex items-center text-dark-600 dark:text-dark-400">
                      <MapPin size={16} className="mr-1 text-accent-500 dark:text-accent-400" /> {exp.location}
                    </span>
                  </div>
                  
                  <ul className="list-disc list-inside space-y-2 mb-4 text-dark-600 dark:text-dark-300">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="text-xs py-1 px-2 rounded bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="text-center mt-12">
          <a 
            href="/resume.pdf" 
            download
            className="btn-secondary"
          >
            Download Full Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;