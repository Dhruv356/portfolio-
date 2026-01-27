"use client";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      
      {/* Background layers */}
      <div className="footer-stars"></div>
      <div className="footer-grid"></div>

      <div className="footer-content">

        {/* LEFT */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            DHRUV<span>.dev</span>
          </h2>
          <p className="footer-tagline">
            Crafting futuristic web experiences with code & motion.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>

        {/* RIGHT */}
        <div className="footer-socials">
          <a href="#" aria-label="GitHub">GH</a>
          <a href="#" aria-label="LinkedIn">IN</a>
          <a href="#" aria-label="Twitter">TW</a>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Dhruv Dalwadi — All systems operational.
      </div>
    </footer>
  );
}
