"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Skill.css";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { name: "React", icon: "/icons/react-2.svg" },
      { name: "Next.js", icon: "/icons/next-js.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "Tailwind / CSS", icon: "/icons/tailwindcss.svg" },
      { name: "Framer Motion", icon: "/icons/framer.svg" },
      { name: "Three.js", icon: "/icons/threejs.svg" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Express", icon: "/icons/expressjs.svg" },
      { name: "REST / GraphQL", icon: "/icons/api.svg" },
      { name: "Authentication", icon: "/icons/auth.svg" },
      { name: "Microservices", icon: "/icons/micro.png" },
      { name: "Serverless", icon: "/icons/serverless.svg" },
    ],
  },
  {
    id: "database",
    title: "Database",
    items: [
      { name: "MongoDB", icon: "/icons/mongo.svg" },
      { name: "Postgres", icon: "/icons/postgres.svg" },
      { name: "Redis", icon: "/icons/redis.svg" },
      { name: "Prisma", icon: "/icons/prisma.svg" },
      { name: "Indexing & Queries", icon: "/icons/query.svg" },
     
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    items: [
      { name: "Git", icon: "/icons/git.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "CI/CD", icon: "/icons/ci.svg" },
      { name: "Vercel / Netlify", icon: "/icons/vercel.svg" },
      { name: "NPM / Yarn", icon: "/icons/npm.svg" },
      { name: "Monitoring", icon: "/icons/monitor.svg" },
    ],
  },
  {
    id: "ui",
    title: "UI & Animation",
    items: [
      { name: "Figma", icon: "/icons/figma.svg" },
      { name: "AE / Motion", icon: "/icons/ae.svg" },
      { name: "GSAP", icon: "/icons/gsap.svg" },
      { name: "Motion Design", icon: "/icons/motion.svg" },
      { name: "Blender 3D", icon: "/icons/blender.svg" },
    
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
  const root = sectionRef.current;
  if (!root) return;

  const cleanups = [];

  // -------------------------
  // 1) Holo scan hover + pop
  // -------------------------
  root.querySelectorAll(".skill-card").forEach((card) => {
    const scan = card.querySelector(".holo-scan");
    if (!scan) return;

    const onEnter = () => {
      gsap.killTweensOf([scan, card]);
      gsap.to(card, { scale: 1.02, duration: 0.25, ease: "power2.out" });

      gsap.fromTo(
        scan,
        { x: "-120%", opacity: 0 },
        {
          x: "120%",
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          onComplete: () => gsap.set(scan, { opacity: 0, x: "-120%" }),
        }
      );
    };

    const onLeave = () => {
      gsap.to(card, { scale: 1, duration: 0.25, ease: "power2.out" });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    });
  });

  // -------------------------
  // 2) Scroll hint (once)
  // -------------------------
  const tl = gsap.timeline({
    scrollTrigger: { trigger: root, start: "top 70%", once: true },
  });

  const hints = root.querySelectorAll(".scroll-hint");

  tl.fromTo(
    hints,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.06 },
    0
  ).to(
    hints,
    {
      opacity: 0,
      y: -6,
      duration: 0.35,
      ease: "power2.in",
      stagger: 0.04,
      delay: 0.6,
    },
    ">"
  );

  // -------------------------
  // 2.5) Scroll reveal (headers + cards)
  // -------------------------
  const blocks = root.querySelectorAll(".category-block");

  blocks.forEach((block) => {
    const header = block.querySelector(".category-header");
    const cards = block.querySelectorAll(".skill-card");

    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 80%" },
        }
      );
    }

    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: block, start: "top 75%" },
        }
      );
    }
  });

  // -------------------------
  // 3) Infinite wrap + Drag
  // -------------------------
  const rows = root.querySelectorAll(".cards-row");

  rows.forEach((row) => {
    const track = row.querySelector(".cards-track");
    if (!track) return;

    const segment = () => track.scrollWidth / 3;

    const setMiddle = () => {
      const seg = segment();
      if (seg > 0) row.scrollLeft = seg;
    };

    const wrap = () => {
      const seg = segment();
      if (!(seg > 0)) return;

      if (row.scrollLeft < seg * 0.35) row.scrollLeft += seg;
      else if (row.scrollLeft > seg * 1.65) row.scrollLeft -= seg;
    };

    const raf = requestAnimationFrame(() => {
      setMiddle();
      wrap();
    });
    cleanups.push(() => cancelAnimationFrame(raf));

    const onScroll = () => wrap();
    row.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => row.removeEventListener("scroll", onScroll));

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onPointerDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;

      isDown = true;
      moved = false;

      row.classList.add("is-dragging");
      try {
        row.setPointerCapture(e.pointerId);
      } catch {}

      startX = e.clientX;
      startScroll = row.scrollLeft;
    };

    const onPointerMove = (e) => {
      if (!isDown) return;
      e.preventDefault();

      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;

      row.scrollLeft = startScroll - dx * 1.8;
      wrap();
    };

    const endDrag = () => {
      isDown = false;
      row.classList.remove("is-dragging");
      wrap();
    };

    const onClickCapture = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    row.addEventListener("pointerdown", onPointerDown);
    row.addEventListener("pointermove", onPointerMove, { passive: false });
    row.addEventListener("pointerup", endDrag);
    row.addEventListener("pointercancel", endDrag);
    row.addEventListener("click", onClickCapture, true);

    cleanups.push(() => {
      row.removeEventListener("pointerdown", onPointerDown);
      row.removeEventListener("pointermove", onPointerMove);
      row.removeEventListener("pointerup", endDrag);
      row.removeEventListener("pointercancel", endDrag);
      row.removeEventListener("click", onClickCapture, true);
    });
  });

  return () => {
    cleanups.forEach((fn) => fn());
    tl.scrollTrigger?.kill();
    tl.kill();
    ScrollTrigger.getAll().forEach((st) => st.kill()); // optional: safe cleanup
  };
}, []);
  return (
    <section id="skills" className="skills-wrap" ref={sectionRef}>
      <div className="skills-vignette" />

      <div className="skills-inner">
        <header className="skills-hero">
          <motion.h1 className="skills-title">Skills & Tools</motion.h1>
          <motion.p className="skills-sub">
            Technologies I use to craft modern, animated, futuristic web experiences.
          </motion.p>
        </header>

        <section className="skills-grid">
          {categories.map((cat) => {
            const loopItems = [...cat.items, ...cat.items, ...cat.items];

            return (
              <div key={cat.id} className="category-block">
                <div className="category-header">
                  <h3>{cat.title}</h3>
                  <div className="category-line" />
                  <span className="scroll-hint">Drag →</span>
                </div>

                <div className="cards-row">
                  <div className="cards-track">
                    {loopItems.map((item, idx) => (
                      <div key={`${cat.id}-${item.name}-${idx}`} className="skill-card glass">
                        <span className="holo-scan" />
                        <div className="icon-wrap">
                          <img className="skill-icon" src={item.icon} alt={item.name} />
                          <div className="icon-aura" />
                        </div>

                        <h4 className="skill-name">{item.name}</h4>
                        <p className="skill-desc">Proficient & production-ready.</p>

                        <div className="skill-meter">
                          <div
                            className="skill-meter-fill"
                            style={{ width: `${72 + (idx % 4) * 6}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </section>
  );
}