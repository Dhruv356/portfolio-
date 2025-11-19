"use client";
import { useState } from "react";
import Introloading from "./Components/Introloading";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
   const [fadeIn, setFadeIn] = useState(false);

  return (
    <>
      {showIntro && <Introloading onFinish={() => setShowIntro(false)} />}

      {!showIntro && (
        <main>
          {!showIntro && (
        <div className={`homepage ${fadeIn ? "visible" : ""}`}>
          
          {/* Optional starfield reused from CSS background */}
          <div className="stars-bg"></div>

          <div className="hero">
            <h1 className="title">Hi, I’m <span>Your Name</span></h1>
            <h2 className="role">Frontend & Full-Stack Developer</h2>

            <div className="buttons">
              <a href="#projects" className="btn">Projects</a>
              <a href="/resume.pdf" className="btn secondary">Download CV</a>
            </div>
          </div>

        </div>
      )}
        </main>
      )}
    </>
  );
}
