import React from "react";
import { Link } from "react-router-dom";
import { socialLinks } from "../data/navigation";

const Footer = () => {
  return (
    <footer className="bg-[#113622] text-white/80 py-8 px-6 rounded-3xl mt-6 mb-3 border border-white/10 relative z-10 overflow-hidden text-center">
      {/* Decorative ambient glow */}
      <div className="absolute -top-10 right-1/2 translate-x-1/2 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="https://svarp.org/company/svarp-logo.webp"
            alt="SVARP Logo"
            className="h-8 w-auto object-contain filter brightness-0 invert group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col text-left">
            <span className="font-serif text-xl tracking-wider font-bold leading-none text-white">
              SVARP
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-accent font-semibold">
              Body Wellness
            </span>
          </div>
        </Link>

        {/* Short Tagline */}
        <p className="text-xs text-white/60 max-w-md leading-relaxed">
          Pure organic wellness, sustainable urban farming &amp; safety leadership for a healthier tomorrow.
        </p>

        {/* Horizontal Navigation Pills */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-white/90">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="text-white/20">•</span>
          <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <span className="text-white/20">•</span>
          <Link to="/about" className="hover:text-accent transition-colors">About Us</Link>
          <span className="text-white/20">•</span>
          <Link to="/mission" className="hover:text-accent transition-colors">Our Mission</Link>
          <span className="text-white/20">•</span>
          <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
        </div>

        {/* Official SVARP Social Media Links */}
        <div className="flex justify-center items-center gap-3">
          {/* Facebook */}
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-all hover:scale-110"
            aria-label="Facebook"
            title="SVARP Global Facebook"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-all hover:scale-110"
            aria-label="Instagram"
            title="SVARP Global Instagram"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-all hover:scale-110"
            aria-label="X (Twitter)"
            title="SVARP Global X / Twitter"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-all hover:scale-110"
            aria-label="LinkedIn"
            title="SVARP Global LinkedIn"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </a>
        </div>

        {/* Divider & Copyright */}
        <div className="w-full border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} SVARP Body Wellness. All Rights Reserved.</p>
          <div className="flex gap-3">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
