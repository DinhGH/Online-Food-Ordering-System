/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_COLORS = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

const Toast = ({ status = "info", message = "", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-6 right-6 max-w-xs w-full ${STATUS_COLORS[status]} text-white text-lg px-4 py-2 rounded-md shadow-md z-50`}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
