import React from "react";
import { Link } from "react-router-dom";
import { footerLinks } from "../data/navigation";
import { Mail, Phone, MapPin, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#113622] text-white/80 pt-16 pb-10 px-6 md:px-12 rounded-3xl mt-12 mb-6 border border-white/10 animate-fade-in relative z-10 overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16 relative z-10">
        {/* Brand Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="https://svarp.org/company/svarp-logo.webp" 
              alt="SVARP Logo" 
              className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter brightness-0 invert"
            />
            <div className="flex flex-col">
              <span className="font-serif text-[1.4rem] tracking-wider font-bold leading-none text-white">
                SVARP
              </span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-accent font-semibold">
                Body Wellness
              </span>
            </div>
          </Link>
          <p className="text-sm text-white/60 leading-relaxed">
            SVARP Body Wellness is committed to promoting a healthy lifestyle through sustainable and natural products.
          </p>
          {/* Social Icons (using inline SVGs for 100% package compatibility) */}
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-accent hover:text-white transition-all" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-accent hover:text-white transition-all" aria-label="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-accent hover:text-white transition-all" aria-label="Youtube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-accent hover:text-white transition-all" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-white font-bold text-base border-b border-white/10 pb-2">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-sm">
            {footerLinks.quickLinks.map((link, i) => (
              <li key={i}>
                <Link to={link.path} className="hover:text-accent transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-white font-bold text-base border-b border-white/10 pb-2">Categories</h4>
          <ul className="flex flex-col gap-3 text-sm">
            {footerLinks.categories.map((link, i) => (
              <li key={i}>
                <Link to={link.path} className="hover:text-accent transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Customer Support */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-white font-bold text-base border-b border-white/10 pb-2">Customer Support</h4>
          <ul className="flex flex-col gap-3 text-sm">
            {footerLinks.customerService.map((link, i) => (
              <li key={i}>
                <Link to={link.path} className="hover:text-accent transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Contact Us */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-white font-bold text-base border-b border-white/10 pb-2">Contact Us</h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-accent flex-shrink-0 mt-0.5" />
              <a href={`tel:${footerLinks.contactInfo.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                {footerLinks.contactInfo.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-accent flex-shrink-0 mt-0.5" />
              <a href={`mailto:${footerLinks.contactInfo.email}`} className="hover:text-accent transition-colors break-all leading-relaxed">
                {footerLinks.contactInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
              <span className="text-white/60">
                {footerLinks.contactInfo.address}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Rights */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>© {new Date().getFullYear()} SVARP Body Wellness. All Rights Reserved.</p>
        <p className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
