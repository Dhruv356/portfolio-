"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "./Skill.css";

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
      { name: "Microservices", icon: "/icons/micro.svg" },
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
      { name: "Replication / Backups", icon: "/icons/backup.svg" },
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
      { name: "Accessibility", icon: "/icons/a11y.svg" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const cards = root.querySelectorAll(".skill-card");

    const handlers = [];

    cards.forEach((card) => {
      const scan = card.querySelector(".holo-scan");
      if (!scan) return;

      const onEnter = () => {
        gsap.killTweensOf(scan);
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
      handlers.push(() => card.removeEventListener("mouseenter", onEnter));
    });

    return () => handlers.forEach((fn) => fn());
  }, []);

  return (
    <section id="skills" className="skills-wrap" ref={sectionRef}>
      <div className="skills-vignette" />

      <div className="skills-inner">
        {/* HERO */}
        <header className="skills-hero">
          <motion.h1
            className="skills-title"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            Skills & Tools
          </motion.h1>

          <motion.p
            className="skills-sub"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          >
            Technologies I use to craft modern, animated, futuristic web experiences.
          </motion.p>
        </header>

        {/* GRID */}
        <section className="skills-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="category-block"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.06 }}
            >
              <div className="category-header">
                <h3>{cat.title}</h3>
                <div className="category-line"></div>
              </div>

              <motion.div
                className="cards-row"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06 } },
                }}
              >
                {cat.items.map((item, j) => (
                  <motion.div
                    key={item.name}
                    className="skill-card glass"
                    variants={{
                      hidden: { opacity: 0, y: 18, scale: 0.98 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.55, ease: "easeOut" },
                      },
                    }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="holo-scan"></span>

                    <motion.div
                      className="skill-float"
                      animate={{ y: [0, -6, 0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                      <div className="icon-wrap">
                        <motion.div
                          className="icon-hit"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.25 }}
                        >
                          <img src={item.icon} className="skill-icon" alt={item.name} />
                        </motion.div>
                        <div className="icon-aura"></div>
                      </div>

                      <h4 className="skill-name">{item.name}</h4>
                      <p className="skill-desc">Proficient & production-ready.</p>

                      <div className="skill-meter">
                        <div
                          className="skill-meter-fill"
                          style={{ width: `${72 + (j % 4) * 6}%` }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </section>
      </div>
    </section>
  );
}
