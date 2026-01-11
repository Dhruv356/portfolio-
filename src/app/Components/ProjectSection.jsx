"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
const projects = [
  {
    id: 1,
    title: "Cosmic Portfolio",
    subtitle: "Futuristic developer portfolio",
    tech: ["Next.js", "GSAP", "Framer Motion"],
    image: "/projects/project1.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "AI Dashboard",
    subtitle: "Realtime analytics interface",
    tech: ["React", "D3.js", "Node"],
    image: "/projects/project2.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "3D Product Showcase",
    subtitle: "Immersive WebGL experience",
    tech: ["Three.js", "GSAP"],
    image: "/projects/project3.jpg",
    link: "#",
  },
];



export default function ProjectSection({ project }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="project-section">
      <div className="project-bg" style={{ backgroundImage: `url(${project.image})` }} />

      <div className="project-content">
        <h1>{project.title}</h1>
        <p>{project.subtitle}</p>

        <div className="tech-stack">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <a href={project.link} className="project-btn">
          View Project
        </a>
      </div>
    </section>
  );
}
