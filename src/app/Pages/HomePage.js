"use client";
import { useState, useEffect } from "react";
import "./Home.css";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import CardCarousel from "../Components/CardCarousel";
import BackgroundCanvas from "../Components/background-canvas/backgroundcanvas";

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const rotatingWords = ["CODE", "ANIMATION", "DESIGN", "TECH", "INTERACTIVITY"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper">
      <Header />

    <BackgroundCanvas/>
      <div className="split-container">
        <div className="left-side">
          <h1 className="title glitch-soft">WELCOME TO MY UNIVERSE</h1>

          <h2 className="subtitle">
            <span>I’m a Developer who loves </span>

            <motion.span
              key={rotatingWords[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ display: "inline-block", minWidth: 120 }}
            >
              {rotatingWords[index]}
            </motion.span>
          </h2>

          <p className="description">
            Blending creativity with technology to craft modern, animated, and interactive web experiences.
          </p>

          <div className="buttons">
            <a className="btn-primary" href="#projects">Explore Work</a>
            <a className="btn-outline" href="#contact">Let’s Connect</a>
          </div>
        </div>

        <div className="neon-divider"></div>

        <div className="right-side">
          <div className="holo-panel">
            <CardCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
