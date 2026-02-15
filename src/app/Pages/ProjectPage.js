"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../Components/ProjectCard";
import "./Project.css";

gsap.registerPlugin(ScrollTrigger);
console.log("✅ USING ProjectCard from:", __filename);

export const projects = [
  {
    id: 1,
    title: "Tech-Trove E-Commerce",
    desc: "Full-stack e-commerce platform with authentication, admin dashboard, product management, cart, and secure checkout flow.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    image: "/icons/Tech-Trove.jpeg",
    video: "/videos/e-commerce.mp4",
    live: "https://techtrovelive.onrender.com",     // add deployed link later
    github: "https://github.com/Dhruv356/techtrovelive",   // add repo link later
  },
  {
    id: 2,
    title: "Realtime Chat App",
    desc: "WhatsApp-like real-time chat application with responsive UI, smooth transitions, and live messaging experience.",
    tech: ["React", "Socket.io", "Node.js", "Express"],
    image: "/icons/chatapp.jpeg",
    video: "/videos/Chatapp.mp4",
    live: "https://chatty-dg4g.onrender.com",
    github: "https://github.com/Dhruv356/chatapp.git",
  },
  {
    id: 3,
    title: "Developer Portfolio",
    desc: "Animated personal portfolio featuring GSAP scroll animations, Framer Motion transitions, and modern glassmorphism UI.",
    tech: ["Next.js", "GSAP", "Framer Motion"],
    image: "/icons/portfolio.jpeg",
    video: "/videos/portfolio.mp4",
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
