"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../Components/ProjectCard";
import "./Project.css";


gsap.registerPlugin(ScrollTrigger);

export const projects = [
  {
    id: 1,
    title: "Futuristic Portfolio",
    desc: "Animated developer portfolio with GSAP, Framer Motion and starfield effects.",
    tech: ["Next.js", "GSAP", "Framer Motion"],
    image: "/icons/portfolio.jpeg",
    video: "/videos/portfolio.mp4",
    live: "#",
    github: "#",
  },
  {
    id: 2,
    title: "AI Dashboard",
    desc: "Real-time analytics dashboard with smooth transitions and glassmorphism UI.",
    tech: ["React", "Node", "Chart.js"],
    image: "/icons/Dashboard.jpeg",
    video: "/videos/chatapp.mp4",
    live: "#",
    github: "#",
  },
  {
    id: 3,
    title: "3D Product Showcase",
    desc: "Interactive 3D experience built with Three.js and smooth scroll effects.",
    tech: ["Three.js", "GSAP", "WebGL"],
    image: "/icons/3d.jpg",
    video: "/videos/e-commerce.mp4",
    live: "#",
    github: "#",
  },
];
export default function ProjectsPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".project-card", {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <header className="projects-hero">
        <h2 className="projects-title">Projects</h2>
        <p className="projects-sub">
          Selected works showcasing animation, performance and modern UI.
        </p>
      </header>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
