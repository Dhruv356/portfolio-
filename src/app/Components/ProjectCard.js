"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = gsap.utils.mapRange(0, rect.height, 8, -8, y);
      const rotateY = gsap.utils.mapRange(0, rect.width, -8, 8, x);

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.03,
        duration: 0.3,
        ease: "power3.out",
        transformPerspective: 900,
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });

      // reset video
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <article
      className="project-card"
      ref={cardRef}
      onMouseEnter={handleEnter}
    >
      {/* IMAGE → VIDEO CROSSFADE */}
      <div className="project-media">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
        />

        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="none"
          className="project-video"
        />
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>

        <div className="project-tech">
          {project.tech.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>

        <div className="project-actions">
          <a href={project.live} target="_blank">Live</a>
          <a href={project.github} target="_blank">GitHub</a>
        </div>
      </div>
    </article>
  );
}
