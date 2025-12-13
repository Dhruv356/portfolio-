"use client";
import { useEffect, useState, useRef } from "react";
import "./Intro.css";

export default function Introloading({ onFinish }) {
  const messages = [
    "Booting Visual System",
    "Rendering Interface",
    "Stabilizing UI",
    "Aligning Components",
    "Experience Ready."
  ];

  const [index, setIndex] = useState(0);

  // Prevent double effects in strict mode
  const effectRun = useRef(false);
  const canvasStarted = useRef(false);

  /* -------------------------
     TEXT ROTATION
  ------------------------- */
  useEffect(() => {
  if (effectRun.current) return;
  effectRun.current = true;

  let i = 0;

  const interval = setInterval(() => {
    if (i < messages.length - 1) {
      i++;
      setIndex(i);
    }
  }, 700); // message speed

  // minimum duration before hiding intro:
  const finishTimer = setTimeout(() => {
    clearInterval(interval);
    onFinish();
  }, messages.length * 700 + 400);

  return () => {
    clearInterval(interval);
    clearTimeout(finishTimer);
  };
}, []);


  /* -------------------------
     STARFIELD CANVAS
  ------------------------- */
  useEffect(() => {
    if (canvasStarted.current) return;
    canvasStarted.current = true;

    const canvas = document.getElementById("starfield");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 350 }, () => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width
    }));

    function animate() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.z -= 2;
        if (star.z <= 0) star.z = canvas.width;

        const k = 128 / star.z;
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;

        if (px > 0 && px < canvas.width && py > 0 && py < canvas.height) {
          const size = (1 - star.z / canvas.width) * 2;
          ctx.fillStyle = "white";
          ctx.fillRect(px, py, size, size);
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="intro-container">
      <canvas id="starfield"></canvas>

      <h1 className="intro-text glitch" data-text={messages[index]}>
        {messages[index]}
      </h1>
    </div>
  );
}
