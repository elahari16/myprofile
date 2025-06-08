import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  link: string;
  description: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Diploma in Artificial Intelligence",
    issuer: "SUNY in association with the State University of New York, USA",
    date: "2024",
    icon: "🤖",
    link: "https://drive.google.com/file/d/11L4CFQAwryspmgf2XM5xbO-5kPAdmwUu/view?usp=drive_link",
    description: "Acquired in-depth understanding of Artificial Intelligence, including machine learning, neural networks, natural language processing, and AI model deployment. Worked on projects using tools like TensorFlow, Keras, and Python."
  },
  {
    id: 2,
    title: "Python Programming",
    issuer: "360DigiTMG",
    date: "2024",
    icon: "🐍",
    link: "https://drive.google.com/file/d/1p6pNRQr_U812U83HUhGA2on72O3HzS6t/view?usp=sharing",
    description: "Learned core Python programming concepts including variables, control structures, functions, file handling, and object-oriented programming. Gained hands-on experience with real-world coding tasks and logic building."
  },
  {
    id: 3,
    title: "SQL Basics",
    issuer: "360DigiTMG",
    date: "2024",
    icon: "🗄️",
    link: "https://drive.google.com/file/d/1aZo96nglP6v2_wY3yiW5DAum5XWoNInw/view?usp=drive_link",
    description: "Learned to write queries using SELECT, JOIN, GROUP BY, and WHERE clauses. Gained practical skills in managing, retrieving, and manipulating data from relational databases."
  },
  {
    id: 4,
    title: "Microsoft Power BI",
    issuer: "360DigiTMG",
    date: "2024",
    icon: "📊",
    link: "https://drive.google.com/file/d/1zZDxgaOIaQ7AII2bdgD-hDc0P5ENgQ8o/view?usp=sharing",
    description: "Gained expertise in data visualization, creating interactive dashboards, and connecting multiple data sources. Learned DAX functions and built business intelligence reports for data analysis."
  },
  {
    id: 5,
    title: "Data Science & AI",
    issuer: "360DigiTMG",
    date: "2024",
    icon: "🧠",
    link: "https://drive.google.com/file/d/1UVW4hV7ix-izn99PZ4b8RH9ZJQQcfpY8/view?usp=drive_link",
    description: "Learned the complete data science pipeline: data preprocessing, visualization, model building, and evaluation using Python. Covered machine learning algorithms, AI concepts, and practical applications in real-world scenarios."
  },
  {
    id: 6,
    title: "Python for Data Science",
    issuer: "NPTEL",
    date: "2023",
    icon: "📈",
    link: "https://drive.google.com/file/d/1qqxs5gLgMzSZFsTfjao_iN_M-RvLt-_K/view?usp=drive_link",
    description: "Strengthened knowledge of Python specifically for data science, including NumPy, Pandas, Matplotlib, and scikit-learn. Applied statistical methods and data analysis techniques in projects."
  },
  {
    id: 7,
    title: "Advanced Microsoft Office",
    issuer: "Naanmudhalvan",
    date: "2023",
    icon: "📝",
    link: "https://drive.google.com/file/d/1Yd-Yx-Iev0Vy_Oi-_Yx-Iev0Vy_Oi/view?usp=sharing",
    description: "Mastered tools like Word, Excel, and PowerPoint. Learned advanced features such as formulas, pivot tables, macros, mail merge, and document automation techniques."
  },
  {
    id: 8,
    title: "English Typewriting",
    issuer: "Govt. of Tamil Nadu",
    date: "2022",
    icon: "⌨️",
    link: "https://drive.google.com/file/d/1tWGuGBVacFyh7jgz3KQBpiabBSsgCam2/view?usp=drive_link",
    description: "Trained in fast and accurate English typewriting techniques using both manual and digital keyboards. Developed typing speed, formatting, and document presentation skills."
  },
  {
    id: 9,
    title: "Desktop Publishing",
    issuer: "CSC",
    date: "2022",
    icon: "🖥️",
    link: "https://drive.google.com/file/d/1rprKVyiHwYu8eDq-MJaVzD6mgyjth1EP/view?usp=drive_link",
    description: "Learned design and layout skills using software like Adobe PageMaker, CorelDRAW, and Photoshop. Gained knowledge in creating brochures, posters, and professional print documents."
  }
];

const CertificateCard: React.FC<{ certificate: Certificate }> = ({ certificate }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900 flex items-center justify-center mr-4 text-2xl">
            {certificate.icon}
          </div>
          <h3 className="font-bold">{certificate.title}</h3>
        </div>
        
        <div className="flex justify-between items-center text-sm text-dark-500 dark:text-dark-400 mb-3">
          <span>{certificate.issuer}</span>
          <span>{certificate.date}</span>
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-40' : 'max-h-0'}`}>
          <p className="text-dark-600 dark:text-dark-300 text-sm mb-4">
            {certificate.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-primary-600 dark:text-primary-400 flex items-center text-sm font-medium hover:underline"
          >
            {expanded ? (
              <>Hide Details <ChevronUp size={14} className="ml-1" /></>
            ) : (
              <>Show Details <ChevronDown size={14} className="ml-1" /></>
            )}
          </button>
          
          <a 
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium flex items-center"
          >
            View Certificate <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Certificates: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-50 dark:bg-dark-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400 text-sm font-medium mb-4">
            My Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">Certificates & Achievements</h2>
          <p className="text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
            A collection of my professional certifications and educational achievements that have helped shape my skills.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((certificate) => (
            <motion.div
              key={certificate.id}
              variants={itemVariants}
            >
              <CertificateCard certificate={certificate} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center mt-12">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-md inline-flex items-center">
            <Award className="w-8 h-8 text-accent-500 dark:text-accent-400 mr-4" />
            <p className="text-dark-600 dark:text-dark-300">
              Continuously expanding my knowledge through courses and certifications in data science and AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;