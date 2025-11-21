import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/kodi logo.png"; // <-- add your image here

const LoadingPage = () => {
  return (
    <motion.div
      id="kodi-loading-screen"
      className="kodi__wrapper"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="kodi__inner"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* 🌟 Glow Circle */}
        <motion.div
          className="kodi__circle"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 360 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <img
            src={logo}
            alt="Kodivian Logo"
            className="kodi__logo-img"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "300%",
              objectFit: "cover",
            }}
          />
        </motion.div>

        {/* ✨ Brand Text */}
        <motion.p
          className="kodi__text"
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
