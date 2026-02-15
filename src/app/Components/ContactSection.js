"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const email = "dhruvdalwadi05@gmail.com"; // shown in UI
  const resumeHref = "Dhruv-Resume.pdf"; // in /public

  // ✅ FormSubmit token (given by FormSubmit)
  const FORM_ID = "ad11b86e45a17c90140560a2333600b2";

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector;

      gsap.from(q(".contact-hero"), {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(q(".contact-card"), {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // ✅ Most reliable for FormSubmit: x-www-form-urlencoded + token id
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    try {
      const payload = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        _replyto: formData.email, // so you can reply directly
        message: formData.message,
        _subject: "Portfolio Contact",
        _captcha: "false",
      });

      const res = await fetch(`https://formsubmit.co/ajax/${FORM_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: payload,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // show error if available
        throw new Error(data?.message || "Failed to send");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // auto reset message after a bit
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <section id="contact" className="contact-wrap" ref={sectionRef}>
      <div className="contact-vignette" />

      <header className="contact-hero">
        <p className="contact-kicker">CONTACT</p>
        <h2 className="contact-title">Let’s Build Something Great</h2>
        <p className="contact-sub">
          Open to full-time roles, freelance work, and collaborations. Reach out
          — I reply fast.
        </p>
      </header>

      <div className="contact-divider" />

      <div className="contact-grid">
        {/* LEFT: Direct actions */}
        <article className="contact-card glass">
          <div className="card-top">
            <span className="card-chip">QUICK ACTIONS</span>
            <span className="card-dot" />
          </div>

          <div className="contact-actions">
            <a className="btn-primary" href={`mailto:${email}`}>
              Email Me
            </a>

            <a
              className="btn-outline"
              href={resumeHref}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>

          <div className="contact-meta">
            <div className="meta-row">
              <span className="meta-label">Email</span>

              <span className="meta-value email-copy" onClick={copyEmail}>
                {email}
                <span className="copy-icon">{copied ? "✓" : "📄"}</span>
              </span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Location</span>
              <span className="meta-value">India</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Availability</span>
              <span className="meta-value">Open</span>
            </div>
          </div>
        </article>

        {/* RIGHT: Form */}
        <article className="contact-card glass">
          <div className="card-top">
            <span className="card-chip">SEND A MESSAGE</span>
            <span className="card-dot" />
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <div className="field">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Tell me about your project / role..."
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn-primary full"
              type="submit"
              disabled={status === "sending"}
              aria-busy={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="form-success">
                ✅ Thank you for connecting! Your message has been sent.
              </p>
            )}

            {status === "error" && (
              <p className="form-error">
                ❌ Something went wrong. Please try again.
              </p>
            )}

            <p className="form-note">
              Prefer LinkedIn? Add your link inside the message.
            </p>
          </form>
        </article>
      </div>

      <footer className="contact-footer">
        <div className="signal">
          <span className="pulse" />
          <span className="pulse" />
          <span className="pulse" />
        </div>

        <p className="footer-text">
          © {new Date().getFullYear()} Dhruv.dev — Built with React, motion &
          intention.
        </p>
      </footer>
    </section>
  );
}