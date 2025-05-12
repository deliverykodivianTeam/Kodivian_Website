import React from 'react';
import { motion } from 'framer-motion';
import { Circle, Loader2 } from 'lucide-react'; // Example icons

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-center z-50">
      {/* Centered Content Container */}
      <div className="flex flex-col items-center gap-8">

        {/* Logo Animation (Replace with your actual logo or brand symbol) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center" // Example styling
        >
            {/* You can replace this with an image if you have one */}
            <Circle className="w-12 h-12 text-white animate-spin-slow" />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl sm:text-2xl font-semibold text-gray-200"
        >
        Welcome to Kodivian
        </motion.p>

        {/* Progress Bar (Optional) */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
          className="w-full max-w-md bg-gray-700 rounded-full h-2.5"
        >
          <div className="bg-purple-500 h-2.5 rounded-full"></div>
        </motion.div>

        {/* Loading Indicator (Optional) */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }} // Appear after progress bar
            className="flex items-center gap-2"
        >
            <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
            <span className="text-gray-400 text-sm">
                Loading...
            </span>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingPage;