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
  const email = "dhruvdalwadi05@gmail.com"; // change if needed
  const resumeHref = "Dhruv-Resume.pdf"; // /public/resume/...

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

    // ✅ safety refresh (fonts/images can shift layout in Next.js)
    ScrollTrigger.refresh();
  }, sectionRef);

  return () => ctx.revert();
}, []);
const handleChange = (e) => {
  setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (status === "sending") return;

  setStatus("sending");

  try {
    const res = await fetch(
      "https://formsubmit.co/ajax/dhruvdalwadi05@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "Portfolio Contact",
          _captcha: "false",
        }),
      }
    );

    if (!res.ok) throw new Error("Failed");

    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  } catch {
    setStatus("error");
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

    <span className="copy-icon">
  {copied ? "✓" : "📄"}
</span>
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

          {/* ✅ This uses FormSubmit (no backend needed)
              Replace YOUR_EMAIL with your email.
          */}
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