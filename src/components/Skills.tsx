import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Server, BarChart, Brain, Users } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming & Tools",
    icon: <Code className="w-6 h-6 text-primary-600 dark:text-primary-400" />,
    skills: ["Python", "SQL", "MySQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Flask", "Jupyter", "Spyder", "Google Colab"]
  },
  {
    title: "Data Visualization",
    icon: <BarChart className="w-6 h-6 text-primary-600 dark:text-primary-400" />,
    skills: ["Power BI", "Tableau", "Matplotlib", "Seaborn", "Plotly", "Data Storytelling", "Dashboard Design"]
  },
  {
    title: "ML/AI Concepts",
    icon: <Brain className="w-6 h-6 text-accent-500 dark:text-accent-400" />,
    skills: ["Supervised Learning", "Unsupervised Learning", "Regression", "Classification", "NLP", "Computer Vision", "Feature Engineering", "Model Evaluation"]
  },
  {
    title: "Big Data & Cloud",
    icon: <Server className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />,
    skills: ["AWS EC2", "Hadoop", "Data Warehousing", "ETL Processes", "Git", "Version Control"]
  },
  {
    title: "Database Management",
    icon: <Database className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />,
    skills: ["SQL", "MySQL", "Database Design", "Query Optimization", "Data Modeling", "MongoDB"]
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-6 h-6 text-accent-500 dark:text-accent-400" />,
    skills: ["Critical Thinking", "Problem-Solving", "Effective Communication", "Leadership", "Team Collaboration", "Time Management"]
  }
];

const Skills: React.FC = () => {
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

  const dailyTools = [
    "Python", "SQL", "VS Code", "Jupyter", "Spyder", "Google Colab", 
    "Power BI", "Excel", "Amazon Q"
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-950">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400 text-sm font-medium mb-4">
            My Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">Skills & Technologies</h2>
          <p className="text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
            I've developed a diverse skill set throughout my journey, focusing on data science, machine learning, and AI technologies.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-dark-50 dark:bg-dark-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-dark-700 flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="text-sm py-1 px-3 rounded-full bg-white dark:bg-dark-700 text-dark-700 dark:text-dark-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8 font-serif">Tools I Use Daily</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {dailyTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-dark-100 dark:bg-dark-800 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    {tool.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-dark-600 dark:text-dark-400">{tool}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;