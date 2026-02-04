"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imgWrap = imgWrapRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Section fade + slight lift
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // Mask text lines
      gsap.from(".about-mask span", {
        y: 120,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: section, start: "top 75%" },
      });

      // Image reveal (clip + lift)
      if (imgWrap) {
        gsap.fromTo(
          imgWrap,
          { clipPath: "inset(100% 0% 0% 0%)", y: 30, opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: imgWrap, start: "top 80%" },
          }
        );
      }

      // Cards pop
      gsap.from(".about-why-card", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: { trigger: ".about-why-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Holo scan on hover (like your Skills cards)
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".about-why-card") || [];
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
            duration: 1.1,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(scan, { opacity: 0, x: "-120%" });
            },
          }
        );
      };

      card.addEventListener("mouseenter", onEnter);
      cleanups.push(() => card.removeEventListener("mouseenter", onEnter));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    // <section id="about" className="about-wrap" ref={sectionRef}>
      <section id="about" className="about-wrap swap-layout" ref={sectionRef}>

      {/* background vignette to calm your grid */}
      <div className="about-vignette" />

      <div className="about-split">
        {/* LEFT */}
        <div className="about-left">
          <p className="about-kicker">INTRODUCTION</p>

          <h2 className="about-title about-mask">
            <span>Crafting</span> <span>Scalable</span> <span>Digital</span>{" "}
            <span>Experiences</span>
          </h2>

          <p className="about-body about-mask">
            <span>
              I’m a Full Stack MERN Developer focused on building modern,
              performance-driven web apps with clean UI and intentional motion.
            </span>
          </p>

          <p className="about-body about-mask">
            <span>
              I blend frontend precision with backend scalability to deliver
              products that feel fast, intuitive, and production-ready.
            </span>
          </p>

          {/* mini stats */}
          <div className="about-stats">
            <div className="about-stat glass">
              <div className="about-stat-num">MERN</div>
              <div className="about-stat-label">Full Stack</div>
            </div>
            <div className="about-stat glass">
              <div className="about-stat-num">UI</div>
              <div className="about-stat-label">Motion-first</div>
            </div>
            <div className="about-stat glass">
              <div className="about-stat-num">API</div>
              <div className="about-stat-label">Scalable backend</div>
            </div>
          </div>

          {/* WHY */}
          <div className="about-why">
            <div className="about-why-head">
              <h3>Why Work With Me</h3>
              <div className="about-line" />
            </div>

            <div className="about-why-grid">
              <motion.div
                className="about-why-card"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                <span className="holo-scan" />
                <div className="about-card-top">
                  <span className="about-card-index">01</span>
                  <span className="about-card-dot" />
                </div>
                <h4>Clean Architecture</h4>
                <p>Scalable structure, readable code, and real-world patterns.</p>
              </motion.div>

              <motion.div
                className="about-why-card"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                <span className="holo-scan" />
                <div className="about-card-top">
                  <span className="about-card-index">02</span>
                  <span className="about-card-dot" />
                </div>
                <h4>Modern UI + Motion</h4>
                <p>GSAP + Framer Motion for smooth, premium interactions.</p>
              </motion.div>

              <motion.div
                className="about-why-card"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                <span className="holo-scan" />
                <div className="about-card-top">
                  <span className="about-card-index">03</span>
                  <span className="about-card-dot" />
                </div>
                <h4>Full-Stack Vision</h4>
                <p>From database & APIs to polished front-end delivery.</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CENTER DIVIDER (hero-style) */}
        <div className="about-divider" />

        {/* RIGHT */}
        <div className="about-right">
          <div className="about-panel glass">
            <div className="about-panel-top">
              <span className="about-chip">PROFILE</span>
              <span className="about-chip ghost">AVAILABLE</span>
            </div>

            <div className="about-image" ref={imgWrapRef}>
              <img
                src="/profile.png"
                alt="Profile"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x1000.png?text=Profile";
                }}
              />
              <div className="about-image-overlay" />
            </div>

            <div className="about-panel-bottom">
              <div className="about-signal">
                <span className="pulse" />
                <span className="pulse" />
                <span className="pulse" />
              </div>
              <p className="about-panel-note">
                Building interactive web experiences with performance + polish.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
