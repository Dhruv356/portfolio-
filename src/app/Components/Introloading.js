"use client";
import { useEffect, useState } from "react";
import "./Intro.css"; 

export default function IntroOverlay({ onFinish }) {
  const messages = [
    "Booting Visual System",
    "Rendering Interface",
    "Stabilizing UI",
    "Aligning Components",
    "Experience Ready."
  ];

  const [index, setIndex] = useState(0);

  // Change text
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => {
        if (prev === messages.length - 1) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Starfield
  useEffect(() => {
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width
    }));

    function animate() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let star of stars) {
        star.z -= 2;
        if (star.z <= 0) star.z = canvas.width;

        const k = 128 / star.z;
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / canvas.width) * 2;
          ctx.fillStyle = "white";
          ctx.fillRect(px, py, size, size);
        }
      }
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="intro-container">
      <div className="scanlines"></div>
      <canvas id="starfield"></canvas>

      <h1
        key={index}
        className="intro-text glitch"
        data-text={messages[index]}
      >
        {messages[index]}
      </h1>
    </div>
  );
}
