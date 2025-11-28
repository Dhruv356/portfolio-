"use client";
import { useState, useEffect } from "react";
import IntroOverlay from "../Components/Introloading";
import "./Home.css";

import Header from "../Components/Header";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroOverlay onFinish={() => setShowIntro(false)} />}

      {!showIntro && (
        <div className="home-wrapper">

          {/* Background effects */}
          <div className="stars-bg"></div>
          <div className="holo-grid"></div>
<div className="stars-bg"></div>
<div className="holo-grid"></div>

{/* NEW GALAXY BACKGROUND */}
<div className="galaxy-mist"></div>

{/* NEW SHOOTING STARS */}
<div className="shooting-stars">
  {Array.from({ length: 6 }).map((_, i) => (
    <div
      key={i}
      className="star"
      style={{
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }}
    ></div>
  ))}
</div>

      <Header/>
         

        
 {/* MAIN SPLIT LAYOUT */}
          <div className="split-container">

            {/* LEFT SIDE TEXT */}
            <div className="left-side">
              <h1 className="title glitch-soft" data-text="Dhruv Dalwadi">
                Dhruv Dalwadi
              </h1>

              <h2 className="subtitle">
                Developer • Designer • Animator
              </h2>

              <p className="description">
                Blending creativity with technology to craft modern, animated,
                and interactive web experiences.
              </p>

              <div className="buttons">
                <a className="btn-primary" href="#projects">Explore Work</a>
                <a className="btn-outline" href="#contact">Let's Connect</a>
              </div>
            </div>

            {/* CENTER NEON DIVIDER */}
            <div className="neon-divider"></div>

            {/* RIGHT SIDE HOLOGRAM PANEL */}
            <div className="right-side">
              <div className="holo-panel">
                <h3>Card Carousel</h3>
                <p>Coming Soon…</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
