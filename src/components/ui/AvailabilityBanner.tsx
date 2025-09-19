import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const AvailabilityBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-6"
    >
      <div className="flex items-center justify-center gap-2">
        <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
        <span className="text-sm font-medium text-green-800 dark:text-green-200">
          🚀 Available for Full-Time Data Science Roles
        </span>
      </div>
    </motion.div>
  );
};

export default AvailabilityBanner;