"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  hoverable?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", title, hoverable = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hoverable ? { y: -5, borderColor: "rgba(255, 255, 255, 0.2)" } : {}}
      className={`glass card ${className}`}
    >
      {title && <span className="card-title">{title}</span>}
      {children}
    </motion.div>
  );
};

export default GlassCard;
