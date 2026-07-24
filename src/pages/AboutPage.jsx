import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  Heart,
  Leaf,
  ShieldCheck,
  Globe,
  Sparkles,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Building2,
} from "lucide-react";

const AboutPage = () => {
  useDocumentTitle("About Us");

  const values = [
    {
      icon: <Heart size={26} className="text-[#1e5e3a]" />,
      title: "Wellness First",
      desc: "Prioritizing natural well-being, holistic health, and pure nutrition in every product.",
    },
    {
      icon: <Leaf size={26} className="text-[#1e5e3a]" />,
      title: "100% Sustainable",
      desc: "Responsibly sourced organic materials, eco-friendly packaging, and zero-waste farming.",
    },
    {
      icon: <ShieldCheck size={26} className="text-[#1e5e3a]" />,
      title: "Certified Quality",
      desc: "Strict HSE and organic certification standards ensuring premium quality you can trust.",
    },
    {
      icon: <Globe size={26} className="text-[#1e5e3a]" />,
      title: "ESG & Sustainability",
      desc: "Empowering communities through smart urban farming, green energy, and ESG integration.",
    },
  ];

  const focusAreas = [
    {
      title: "Workplace Safety & Risk Engineering",
      desc: "Promoting HSE excellence, risk management, and professional safety leadership across industries.",
      icon: <ShieldCheck size={24} className="text-[#1e5e3a]" />,
    },
    {
      title: "Certified Organic Foods & Nutrition",
      desc: "Cold-pressed oils, pure spices, herbal supplements, and nutrient-dense organic foods direct from certified farms.",
      icon: <Leaf size={24} className="text-[#1e5e3a]" />,
    },
    {
      title: "Urban Agricultural Setups",
      desc: "Pioneering home hydroponics, polyhouses, vertical farming, and smart agricultural kits for self-sustainable living.",
      icon: <Sparkles size={24} className="text-[#1e5e3a]" />,
    },
    {
      title: "Sustainability & ESG Integration",
      desc: "Delivering impactful ESG advisory, carbon reduction programs, and eco-conscious supply chains.",
      icon: <Globe size={24} className="text-[#1e5e3a]" />,
    },
    {
      title: "Community & Skill Development",
      desc: "Empowering women, youth, and farmers through education, health awareness, and skill building.",
      icon: <Users size={24} className="text-[#1e5e3a]" />,
    },
  ];

  const team = [
    {
      name: "Late Mr. Rajvir Singh",
      role: "Former Director",
      bio: "Distinguished leader with 40+ years in Central Government governance and public policy. Laid the foundation for SVARP's values.",
    },
    {
      name: "Mrs. Santosh Singh",
      role: "Director",
      bio: "Committed social activist focused on women empowerment, community welfare, and social development.",
    },
    {
      name: "Dr. Preeti Chaudhary",
      role: "Director",
      bio: "PhD in Sociology with deep expertise in community development, social research, and educational programs.",
    },
    {
      name: "Mr. Vikash Kumar",
      role: "CEO & Founder",
      bio: "HSE leader and global trainer specializing in risk management, safety leadership, and sustainability.",
    },
    {
      name: "Ms. Seema Chaudhary",
      role: "Project Director",
      bio: "Fitness and wellness specialist with a strong sports background, leading holistic health initiatives.",
    },
    {
      name: "Mrs. Poonam Singh",
      role: "Project Director",
      bio: "Philosophy graduate dedicated to life skills, home management education, and personal development.",
    },
  ];

  return (
    <>
      <div className="py-4 animate-fade-in min-h-[60vh]">
        {/* About Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#faf9f5] via-[#f4f7f2] to-[#e9f2e7] p-8 md:p-12 border border-white/60 mb-8 overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="flex-1 space-y-4">
            <h1 className="font-serif text-[2.4rem] md:text-[3.4rem] font-black leading-tight text-[#1e5e3a]">
              Building a Safer &amp; <br />
              <span className="text-accent">Sustainable Tomorrow</span>
            </h1>
            <p className="text-base md:text-lg text-[#2d3a30]/80 max-w-2xl leading-relaxed">
              SVARP Global is an innovative organization working at the intersection of safety leadership, organic agriculture, ESG integration, and community development.
            </p>
          </div>
          <div className="flex-1 max-w-md w-full">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/80 shadow-md space-y-3">
              <div className="flex items-center gap-3 text-[#1e5e3a]">
                <Award size={24} />
                <span className="font-serif font-bold text-lg">SVARP Organization</span>
              </div>
              <p className="text-xs text-[#2d3a30]/75 leading-relaxed">
                Empowering businesses, farmers, and everyday families through certified organic nutrition and workplace safety solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Organization Story & Core Philosophy */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#1e5e3a]/10 shadow-sm mb-8 space-y-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1e5e3a]">Our Story &amp; Philosophy</h2>
          <p className="text-sm text-[#2d3a30]/80 leading-relaxed">
            Founded with a vision of holistic human safety and eco-conscious living, SVARP Global operates across workplace risk management, certified organic foods, and urban agriculture setups. We believe that true health begins with unadulterated natural nutrition and a safe, sustainable environment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#faf9f5] p-4 rounded-2xl border border-[#1e5e3a]/10">
              <h3 className="font-serif font-bold text-[#1e5e3a] text-base mb-1">Organic Nutrition</h3>
              <p className="text-xs text-[#2d3a30]/70">Direct farm-to-table cold-pressed oils, pure spices, and traditional herbal supplements.</p>
            </div>
            <div className="bg-[#faf9f5] p-4 rounded-2xl border border-[#1e5e3a]/10">
              <h3 className="font-serif font-bold text-[#1e5e3a] text-base mb-1">Urban Agriculture</h3>
              <p className="text-xs text-[#2d3a30]/70">Pioneering home hydroponics, polyhouse setups, and vertical farming kits.</p>
            </div>
            <div className="bg-[#faf9f5] p-4 rounded-2xl border border-[#1e5e3a]/10">
              <h3 className="font-serif font-bold text-[#1e5e3a] text-base mb-1">Safety Leadership</h3>
              <p className="text-xs text-[#2d3a30]/70">Global HSE training, risk engineering, and professional certification programs.</p>
            </div>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#1e5e3a]/10 mb-8">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1e5e3a]">Our Focus Areas</h2>
            <p className="text-xs text-[#2d3a30]/65 mt-1">
              Delivering measurable impact across industries, agriculture, and society.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {focusAreas.map((area, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#1e5e3a]/10 hover:border-[#1e5e3a]/25 transition-all space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#1e5e3a]/10 flex items-center justify-center">
                  {area.icon}
                </div>
                <h3 className="font-serif font-bold text-sm text-[#1e5e3a]">{area.title}</h3>
                <p className="text-xs text-[#2d3a30]/70 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Advisory Team */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1e5e3a]">Leadership &amp; Advisory Team</h2>
            <p className="text-xs text-[#2d3a30]/65 mt-1">
              Guided by experienced public policy leaders, HSE specialists, and social activists.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((m, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-[#1e5e3a]/10 hover:shadow-md transition-all space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full inline-block">
                  {m.role}
                </span>
                <h3 className="font-serif font-bold text-base text-[#1e5e3a]">{m.name}</h3>
                <p className="text-xs text-[#2d3a30]/75 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-[#1e5e3a] to-[#113622] rounded-3xl p-8 text-white text-center space-y-4 mb-6 shadow-lg">
          <h2 className="font-serif text-2xl md:text-3xl font-black">
            Learn More About Our Mission
          </h2>
          <p className="text-xs md:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Discover how SVARP is driving sustainable urban farming, certified organic foods, and safety leadership worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/mission"
              className="bg-accent hover:bg-amber-700 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              Our Mission &amp; Vision <ArrowRight size={14} />
            </Link>
            <Link
              to="/shop"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
