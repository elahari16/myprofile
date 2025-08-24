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
          
          <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-6">
            {[
              { name: "Python", icon: "icon/Python.png" },
              { name: "SQL", icon: "icon/sql.png" },
              { name: "VS Code", icon: "icon/vs code.png" },
              { name: "Jupyter", icon: "icon/Jupyter.png" },
              { name: "Spyder", icon: "icon/spyder.png" },
              { name: "Google Colab", icon: "icon/google colab.png" },
              { name: "Power BI", icon: "icon/power-bi.png" },
              { name: "Excel", icon: "icon/excel.png" },
              { name: "Amazon Q", icon: "icon/Amazon-q-.jpg" },
              { name: "ChatGPT", icon: "icon/chat gbt.png" },
              { name: "Google NotebookLM", icon: "icon/google note book lm.png" },
              { name: "Blockbox AI", icon: "icon/block box ai.png" },
            ].map((tool, index) => (
              <motion.div
                key={index}
                className="text-center hover:scale-105 transition-transform duration-300 flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={tool.icon} 
                  alt={tool.name} 
                  className="w-[50px] h-[50px] object-contain mb-3" 
                />
                <span className="text-sm font-medium text-dark-900 dark:text-white">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
