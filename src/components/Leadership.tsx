import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Heart } from 'lucide-react';

interface LeadershipRole {
  id: number;
  title: string;
  organization: string;
  period: string;
  icon: React.ReactNode;
  responsibilities: string[];
}

const leadershipRoles: LeadershipRole[] = [
  {
    id: 1,
    title: "Student Vice President",
    organization: "Department of IT",
    period: "2023 - 2024",
    icon: <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />,
    responsibilities: [
      "Represented the student body in academic and cultural matters.",
      "Coordinated multiple departmental events and workshops.",
      "Acted as a liaison between students and faculty."
    ]
  },
  {
    id: 2,
    title: "NSS Coordinator",
    organization: "National Service Scheme",
    period: "2022 - 2023",
    icon: <Heart className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />,
    responsibilities: [
      "Led social initiatives like blood donation camps and campus clean-up drives.",
      "Organized community outreach and awareness programs.",
      "Encouraged student participation in public welfare activities."
    ]
  }
];

const Leadership: React.FC = () => {
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
    <section id="leadership" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-950">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="section-tag mb-4">// beyond_academics</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif text-dark-900 dark:text-white">Leadership & <span className="gradient-text">Activities</span></h2>
          <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
            My involvement in leadership roles and community activities that have shaped my personal and professional growth.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {leadershipRoles.map((role) => (
            <motion.div
              key={role.id}
              variants={itemVariants}
              className="glass-card glass-card-hover p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-dark-900/70 border border-primary-500/25 flex items-center justify-center mr-4">
                  {role.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white">{role.title}</h3>
                  <p className="text-dark-500 dark:text-dark-400">{role.organization} • {role.period}</p>
                </div>
              </div>
              
              <ul className="space-y-2 mt-4 pl-5 list-disc text-dark-600 dark:text-dark-300">
                {role.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <p className="text-dark-600 dark:text-dark-300 max-w-2xl mx-auto italic">
            "Leadership is not about being in charge. It's about taking care of those in your charge."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Leadership;