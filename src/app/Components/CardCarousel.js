"use client";
import { useState, useEffect } from "react";
import "./cardcarousel.css";

export default function CardCarousel() {
  const techStack = [
    { name: "React", desc: "Component-based UI building.", icon: "/icons/react-2.svg" },
    { name: "Next.js", desc: "Full-stack + hybrid rendering.", icon: "/icons/next-js.svg" },
    { name: "Node.js", desc: "Backend JavaScript runtime.", icon: "/icons/nodejs.svg" },
    { name: "MongoDB", desc: "Flexible NoSQL database.", icon: "/icons/mongo.svg" },
    { name: "Express", desc: "Minimal & powerful backend framework.", icon: "/icons/expressjs.svg" }
  ];

  const [index, setIndex] = useState(0);
  const [particles, setParticles] = useState([]);

  // Generate random particles only on client
  useEffect(() => {
    const particleSet = techStack.map(() =>
      Array.from({ length: 8 }).map(() => ({
        x: Math.random(),
        y: Math.random(),
      }))
    );
    setParticles(particleSet);
  }, []);

  const prev = () =>
    setIndex((index - 1 + techStack.length) % techStack.length);

  const next = () =>
    setIndex((index + 1) % techStack.length);

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        {techStack.map((tech, i) => (
          <div
            key={i}
            className={`carousel-card ${
              i === index
                ? "active"
                : i === (index + 1) % techStack.length
                ? "next"
                : (index - 1 + techStack.length) % techStack.length === i
                ? "prev"
                : ""
            }`}
          >
            {/* --- PARTICLES --- */}
            <div className="particles">
              {particles[i]?.map((p, idx) => (
                <div
                  key={idx}
                  className="particle"
                  style={{
                    "--rand-x": p.x,
                    "--rand-y": p.y,
                    left: "50%",
                    top: "45%",
                  }}
                />
              ))}
            </div>

            {/* --- CARD CONTENT --- */}
            <img src={tech.icon} className="tech-icon" alt={tech.name} />

            <h3>{tech.name}</h3>
            <p>{tech.desc}</p>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button onClick={prev} className="carousel-btn">‹</button>
        <button onClick={next} className="carousel-btn">›</button>
      </div>
    </div>
  );
}
