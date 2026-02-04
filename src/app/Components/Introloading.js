"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Intro.css";

export default function Introloading({ onFinish }) {
  const messages = useMemo(
    () => [
      "BOOTING VISUAL SYSTEM",
      "RENDERING INTERFACE",
      "STABILIZING UI",
      "ALIGNING COMPONENTS",
      "EXPERIENCE READY",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const starsRef = useRef([]);
  const startRef = useRef(0);

  // TEXT TIMING
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      if (i < messages.length - 1) {
        i += 1;
        setIndex(i);
      }
    }, 720);

    const finishTimer = setTimeout(() => {
      setLeaving(true);
      // allow fade-out
      setTimeout(() => onFinish?.(), 520);
    }, messages.length * 720 + 520);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimer);
    };
  }, [messages, onFinish]);

  // STARFIELD CANVAS (SOFTER, PREMIUM)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Build stars once
    const W = window.innerWidth;
    const H = window.innerHeight;

    starsRef.current = Array.from({ length: 260 }, () => ({
      x: Math.random() * W - W / 2,
      y: Math.random() * H - H / 2,
      z: Math.random() * W,
      r: Math.random() * 1.4 + 0.2, // radius
      a: Math.random() * 0.5 + 0.15, // alpha
    }));

    startRef.current = performance.now();

    const animate = (t) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Soft fade instead of full clear (gives motion trail)
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, w, h);

      const speed = 1.6; // slower = more premium
      const flicker = 0.6 + 0.4 * Math.sin((t - startRef.current) / 900);

      for (const s of starsRef.current) {
        s.z -= speed;
        if (s.z <= 1) s.z = w;

        const k = 120 / s.z;
        const px = s.x * k + w / 2;
        const py = s.y * k + h / 2;

        if (px < 0 || px > w || py < 0 || py > h) continue;

        const size = s.r * (1 - s.z / w) * 2.1;

        // Slight cyan tint; not pure white
        ctx.fillStyle = `rgba(160, 255, 255, ${Math.min(
          0.65,
          s.a * flicker
        )})`;
        ctx.fillRect(px, py, Math.max(0.6, size), Math.max(0.6, size));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Start with clean frame
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="intro-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <canvas ref={canvasRef} className="starfield" />

          <div className="intro-overlay">
            <div className="scanlines" />
            <div className="vignette" />
          </div>

          <div className="intro-center">
            <div className="intro-chip">
              <span className="chip-dot" />
              SYSTEM ONLINE
            </div>

            <AnimatePresence mode="wait">
              <motion.h1
                key={messages[index]}
                className="intro-text"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {messages[index]}
              </motion.h1>
            </AnimatePresence>

            <div className="intro-bar">
              <span className="intro-bar-fill" />
            </div>

            <p className="intro-sub">
              initializing modules • syncing motion • calibrating visuals
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
