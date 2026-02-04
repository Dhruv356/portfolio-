"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./cardcarousel.css";

export default function CardCarousel() {
  const techStack = [
    { name: "React", desc: "Component-based UI building.", icon: "/icons/react-2.svg" },
    { name: "Next.js", desc: "Full-stack + hybrid rendering.", icon: "/icons/next-js.svg" },
    { name: "Node.js", desc: "Backend JavaScript runtime.", icon: "/icons/nodejs.svg" },
    { name: "MongoDB", desc: "Flexible NoSQL database.", icon: "/icons/mongo.svg" },
    { name: "Express", desc: "Minimal & powerful backend framework.", icon: "/icons/expressjs.svg" },
  ];

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  // GSAP auto-rotation
  useEffect(() => {
    intervalRef.current = gsap.delayedCall(3.2, function tick() {
      setIndex((prev) => (prev + 1) % techStack.length);
      intervalRef.current = gsap.delayedCall(3.2, tick);
    });

    return () => {
      intervalRef.current?.kill();
    };
  }, [techStack.length]);

  const pause = () => intervalRef.current?.pause();
  const resume = () => intervalRef.current?.resume();

  return (
    <div className="carousel-wrapper" onMouseEnter={pause} onMouseLeave={resume}>
      <div className="carousel">
        {techStack.map((tech, i) => {
          let state = "idle";
          if (i === index) state = "active";
          else if (i === (index + 1) % techStack.length) state = "next";
          else if (i === (index - 1 + techStack.length) % techStack.length)
            state = "prev";

          return (
            <div key={tech.name} className="carousel-card" data-state={state}>
              <div className="card-content">
                <img src={tech.icon} className="tech-icon" alt={tech.name} />
                <h3>{tech.name}</h3>
                <p>{tech.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* manual override */}
      <div className="carousel-controls">
        <button
          className="carousel-btn"
          onClick={() => setIndex((index - 1 + techStack.length) % techStack.length)}
        >
          ‹
        </button>
        <button
          className="carousel-btn"
          onClick={() => setIndex((index + 1) % techStack.length)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
