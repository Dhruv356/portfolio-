"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Set up perspective for 3D rotation
    gsap.set(card, {
      transformPerspective: 900,
      transformStyle: "preserve-3d",
    });

    // Setup individual quickSetters
    const setX = gsap.quickSetter(card, "rotateY", "deg");
    const setY = gsap.quickSetter(card, "rotateX", "deg");
    const setScaleX = gsap.quickSetter(card, "scaleX");
    const setScaleY = gsap.quickSetter(card, "scaleY");

    const onEnter = () => {
      card.style.willChange = "transform";
    };

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = gsap.utils.mapRange(0, rect.width, -6, 6, x);
      const rotateX = gsap.utils.mapRange(0, rect.height, 6, -6, y);

      setX(rotateY);
      setY(rotateX);
      setScaleX(1.05);
      setScaleY(1.05);
    };

    const onLeave = () => {
      card.style.willChange = "auto";

      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.6,
        ease: "power3.out",
      });

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    return () => {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  console.log("✅ USING ProjectCard from:", __filename);

  const handleEnter = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  return (
    <article ref={cardRef} className="project-card" onMouseEnter={handleEnter}>
      <div className="project-media">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
          loading="lazy"
        />

        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="project-video"
        />
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>

        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="project-actions">
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            Live
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
