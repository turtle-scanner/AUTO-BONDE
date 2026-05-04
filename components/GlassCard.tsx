"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  hoverable?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", title, icon, hoverable = true, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hoverable ? { y: -5, borderColor: "rgba(255, 255, 255, 0.2)" } : {}}
      className={`glass card ${className}`}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      {title && (
        <div className="glass-card-header">
          {icon && <span className="card-icon">{icon}</span>}
          <h3>{title}</h3>
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default GlassCard;
