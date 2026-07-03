import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FolderGit2, Languages, Award } from 'lucide-react';
import CountUp from './ui/CountUp';

interface Stat {
  icon: React.ReactNode;
  end: number;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { icon: <Briefcase className="w-6 h-6" />, end: 1, suffix: '+', label: 'Years building AI' },
  { icon: <FolderGit2 className="w-6 h-6" />, end: 4, suffix: '+', label: 'Featured projects' },
  { icon: <Languages className="w-6 h-6" />, end: 22, label: 'Languages · MILTRANS' },
  { icon: <Award className="w-6 h-6" />, end: 9, label: 'Certifications' },
];

const Metrics: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-950 relative">
      <div className="absolute inset-0 bg-detect-grid opacity-40" />
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card glass-card-hover p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-300">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono gradient-text">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-dark-600 dark:text-dark-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
