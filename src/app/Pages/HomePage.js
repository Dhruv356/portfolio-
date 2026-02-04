"use client";

import { useState, useEffect, useRef } from "react";
import "./Home.css";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../Components/Header";
import CardCarousel from "../Components/CardCarousel";
import BackgroundCanvas from "../Components/background-canvas/backgroundcanvas";

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const rotatingWords = ["CODE", "ANIMATION", "DESIGN", "TECH", "INTERACTIVITY"];
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper" ref={heroRef}>
      <Header />

      {/* background */}
      <BackgroundCanvas />

      {/* overlay to calm background */}
      <div className="home-vignette" />

      <div className="split-container">
        {/* LEFT */}
        <div className="left-side">
          <div className="hero-chip glass">
            <span className="chip-dot" />
            PORTFOLIO SYSTEM ONLINE
          </div>

          {/* FIXED: data-text now present so your glitch works */}
          <h1 className="title glitch-soft" data-text="WELCOME TO MY UNIVERSE">
            WELCOME TO MY UNIVERSE
          </h1>

          <h2 className="subtitle">
            <span>I’m a Developer who loves </span>

            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[index]}
                initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rotating-word"
              >
                {rotatingWords[index]}
              </motion.span>
            </AnimatePresence>
          </h2>

          <p className="description">
            Blending creativity with technology to craft modern, animated, and interactive web
            experiences.
          </p>

          <div className="buttons">
            <a className="btn-primary" href="#projects">
              Explore Work
            </a>
            <a className="btn-outline" href="#contact">
              Let’s Connect
            </a>
          </div>

          {/* subtle signal */}
          <div className="hero-signal">
            <span className="pulse" />
            <span className="pulse" />
            <span className="pulse" />
            <span className="signal-text">calibrating visuals</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="neon-divider" />

        {/* RIGHT */}
        <div className="right-side">
  <div className="hud-frame">
    <CardCarousel />
  </div>
</div>

      </div>
    </div>
  );
}
