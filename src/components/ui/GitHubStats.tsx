import React from 'react';
import { motion } from 'framer-motion';

const GitHubStats: React.FC = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold mb-4 text-center">GitHub Activity</h3>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <img 
          src="https://github-readme-stats.vercel.app/api?username=elahari16&show_icons=true&theme=radical&hide_border=true&bg_color=00000000" 
          alt="GitHub Stats" 
          className="rounded-lg max-w-full"
        />
        <img 
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=elahari16&layout=compact&theme=radical&hide_border=true&bg_color=00000000" 
          alt="Top Languages" 
          className="rounded-lg max-w-full"
        />
      </div>
    </motion.div>
  );
};

export default GitHubStats;