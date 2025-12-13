"use client";
import { motion } from "framer-motion";

export default function GlitchText({ text }) {
  return (
    <motion.h2
      className="glitch-title"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      data-text={text}
    >
      {text}
    </motion.h2>
  );
}
