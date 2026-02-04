"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Process.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    title: "Understand the Problem",
    desc: "Clarify goals, users, constraints, and success metrics before touching code.",
    tags: ["Research", "User Flow", "Scope"],
  },
  {
    id: "02",
    title: "Design the System",
    desc: "Plan UI structure + API architecture so the product stays scalable.",
    tags: ["UI Layout", "API Plan", "DB Model"],
  },
  {
    id: "03",
    title: "Build with Motion",
    desc: "Develop clean components and add intentional motion that improves UX.",
    tags: ["React", "GSAP", "Framer Motion"],
  },
  {
    id: "04",
    title: "Optimize & Polish",
    desc: "Performance, accessibility, edge cases—make it feel fast and premium.",
    tags: ["Perf", "A11y", "Micro UX"],
  },
  {
    id: "05",
    title: "Ship & Iterate",
    desc: "Deploy, monitor, collect feedback, and improve—real products evolve.",
    tags: ["Deploy", "Fix", "Iterate"],
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title + subtitle
      gsap.fromTo(
        ".process-hero",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // Cards stagger
      gsap.from(".process-card", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: ".process-grid", start: "top 82%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scan line hover
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".process-card");
    const cleanups = [];

    cards.forEach((card) => {
      const scan = card.querySelector(".holo-scan");
      if (!scan) return;

      const onEnter = () => {
        gsap.fromTo(
          scan,
          { x: "-120%", opacity: 0 },
          {
            x: "120%",
            opacity: 1,
            duration: 1.05,
            ease: "power2.out",
            onComplete: () => gsap.set(scan, { opacity: 0, x: "-120%" }),
          }
        );
      };

      card.addEventListener("mouseenter", onEnter);
      cleanups.push(() => card.removeEventListener("mouseenter", onEnter));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="process" className="process-wrap" ref={sectionRef}>
      <div className="process-vignette" />

      <header className="process-hero">
        <p className="process-kicker">WORKFLOW</p>
        <h2 className="process-title">How I Build Products</h2>
        <p className="process-sub">
          A motion-first, scalable development process—designed for real-world
          production.
        </p>
      </header>

      <div className="process-grid">
        {steps.map((s) => (
          <article key={s.id} className="process-card">
            <span className="holo-scan" />

            <div className="process-top">
              <span className="process-index">{s.id}</span>
              <span className="process-dot" />
            </div>

            <h3 className="process-card-title">{s.title}</h3>
            <p className="process-desc">{s.desc}</p>

            <div className="process-tags">
              {s.tags.map((t) => (
                <span key={t} className="process-tag">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
