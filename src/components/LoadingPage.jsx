import React from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <motion.div
      id="loading-screen"
      className="fixed inset-0 flex items-center justify-center 
                 bg-gradient-to-br from-violet-200 via-purple-300 to-fuchsia-200 
                 text-gray-800 z-[9999]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-center"
      >
        {/* Glow Circle */}
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-r 
                     from-violet-500 to-fuchsia-400 
                     flex items-center justify-center mx-auto 
                     shadow-[0_0_25px_rgba(168,85,247,0.5)]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 360 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          {/* Logo / Letter */}
          <h1 className="text-4xl font-extrabold tracking-wide text-white drop-shadow-md">
            K
          </h1>
        </motion.div>

        {/* Brand Text */}
        <motion.p
          className="mt-4 text-lg font-medium text-gray-700 tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Kodivian Technologies
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingPage;
