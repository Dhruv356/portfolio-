"use client";
import { useState, useEffect } from "react";
import "./backgroundcanvas.css";

export default function BackgroundCanvas() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: 6 }).map(() => ({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
    }));
    setStars(arr);
  }, []);

  return (
    <>
      <div className="stars-bg"></div>
      <div className="galaxy-mist"></div>
      <div className="holo-grid"></div>

      <div className="shooting-stars">
        {stars.map((s, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.animationDelay,
              animationDuration: s.animationDuration,
            }}
          />
        ))}
      </div>
    </>
  );
}
