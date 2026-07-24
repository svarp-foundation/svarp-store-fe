import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEOHead from "../components/utils/SEOHead";
import {
  Target,
  Compass,
  Leaf,
  ShieldCheck,
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TreePine,
  Sun,
  Award,
} from "lucide-react";

const MissionPage = () => {
  useDocumentTitle("Our Mission & Vision");

  const pillars = [
    {
      icon: <Leaf size={28} className="text-[#1e5e3a]" />,
      title: "1. 100% Pure Organic Nutrition",
      desc: "Delivering chemical-free, nutrient-dense foods, cold-pressed oils, and herbal wellness direct from certified organic farms.",
    },
    {
      icon: <Sparkles size={28} className="text-[#1e5e3a]" />,
      title: "2. Smart Urban Agriculture",
      desc: "Equipping households with home hydroponics, polyhouse setups, and vertical farming kits for self-sustainable living.",
    },
    {
      icon: <ShieldCheck size={28} className="text-[#1e5e3a]" />,
      title: "3. Health & Safety Leadership (HSE)",
      desc: "Advancing workplace risk engineering, safety leadership certifications, and environmental protection across industries.",
    },
    {
      icon: <Globe size={28} className="text-[#1e5e3a]" />,
      title: "4. ESG Integration & Eco Action",
      desc: "Pioneering carbon reduction programs, eco-conscious packaging, and zero-waste supply chain management.",
    },
  ];

  const goals = [
    {
      stat: "100%",
      label: "Chemical-Free & Natural",
      desc: "Strict organic purity across all wellness products.",
    },
    {
      stat: "50,000+",
      label: "Homes Empowered",
      desc: "Targeted urban agricultural setups and wellness education.",
    },
    {
      stat: "Zero Waste",
      label: "Eco Packaging Goal",
      desc: "Eliminating single-use plastics from our packaging and logistics.",
    },
    {
      stat: "100+",
      label: "Safety & Skill Programs",
      desc: "Training workforce leaders in safety leadership and sustainability.",
    },
  ];

  return (
    <>
      <SEOHead
        title="Our Mission & Vision"
        description="Discover SVARP's mission to bridge 100% certified organic nutrition, workplace safety, urban agriculture setups, and carbon reduction."
      />
      <div className="py-4 animate-fade-in min-h-[60vh]">
        {/* Mission Hero */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#faf9f5] via-[#f4f7f2] to-[#e9f2e7] p-8 md:p-12 border border-white/60 mb-8 overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="flex-1 space-y-4">
            <h1 className="font-serif text-[2.4rem] md:text-[3.4rem] font-black leading-tight text-[#1e5e3a]">
              Our Mission &amp; Vision <br />
              <span className="text-accent">For a Sustainable Future</span>
            </h1>
            <p className="text-base md:text-lg text-[#2d3a30]/80 max-w-2xl leading-relaxed">
              At SVARP, our mission is to create a healthier, safer, and ecologically balanced world by bridging certified organic nutrition, urban agricultural technology, and workplace safety leadership.
            </p>
          </div>
          <div className="flex-1 max-w-md w-full">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/80 shadow-md space-y-3">
              <div className="flex items-center gap-3 text-[#1e5e3a]">
                <Award size={24} />
                <span className="font-serif font-bold text-lg">Safety With Purpose</span>
              </div>
              <p className="text-xs text-[#2d3a30]/75 leading-relaxed">
                Empowering individuals, families, and organizations to live naturally, work safely, and protect our planet.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Mission & Vision Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Mission Block */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#1e5e3a]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1e5e3a]/10 flex items-center justify-center text-[#1e5e3a]">
              <Target size={26} />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1e5e3a]">The SVARP Mission</h2>
            <p className="text-sm text-[#2d3a30]/80 leading-relaxed">
              Our mission is to empower households, farmers, and industries with 100% certified organic nutrition, sustainable urban farming setups, and safety leadership training that promote long-term human health and environmental preservation.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-[#2d3a30]/80">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Organic Purity:</strong> Deliver unadulterated cold-pressed oils, spices, and herbal supplements.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#2d3a30]/80">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Urban Farming:</strong> Enable families to grow their own fresh produce with home hydroponics and polyhouses.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#2d3a30]/80">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Safety Leadership:</strong> Equip professionals and workforces with world-class HSE and risk management skills.</span>
              </div>
            </div>
          </div>

          {/* Vision Block */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#1e5e3a]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1e5e3a]/10 flex items-center justify-center text-[#1e5e3a]">
              <Compass size={26} />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1e5e3a]">The SVARP Vision</h2>
            <p className="text-sm text-[#2d3a30]/80 leading-relaxed">
              We envision a world where every household has direct access to pure organic food and self-sustaining farming systems, and where every workplace operates with safety, integrity, and environmental accountability.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-[#2d3a30]/80">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero Purity Compromise:</strong> Setting global standards for organic certification and transparency.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#2d3a30]/80">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Green Communities:</strong> Fostering eco-conscious urban agriculture across towns and cities.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#2d3a30]/80">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Global ESG Leadership:</strong> Championing carbon reduction, zero plastic waste, and social impact.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Impact */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1e5e3a]">Pillars of Our Mission</h2>
            <p className="text-xs text-[#2d3a30]/65 mt-1 max-w-lg mx-auto">
              Our core commitments that guide every product, farming setup, and safety initiative we build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#1e5e3a]/10 hover:shadow-md transition-all space-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#1e5e3a]/10 flex items-center justify-center mb-2">
                  {p.icon}
                </div>
                <h3 className="font-serif font-bold text-sm text-[#1e5e3a]">{p.title}</h3>
                <p className="text-xs text-[#2d3a30]/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Measurable Impact & Sustainability Goals */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#1e5e3a]/10 mb-8">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1e5e3a]">Measurable Impact Goals</h2>
            <p className="text-xs text-[#2d3a30]/65 mt-1">
              Translating our values into tangible environmental and health outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {goals.map((g, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#1e5e3a]/10 text-center space-y-1">
                <span className="font-serif font-black text-3xl text-[#1e5e3a] block">{g.stat}</span>
                <span className="font-serif font-bold text-xs text-accent uppercase tracking-wider block">{g.label}</span>
                <p className="text-[11px] text-[#2d3a30]/70 leading-relaxed pt-1">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-[#1e5e3a] to-[#113622] rounded-3xl p-8 text-white text-center space-y-4 mb-6 shadow-lg">
          <h2 className="font-serif text-2xl md:text-3xl font-black">
            Be a Part of the SVARP Movement
          </h2>
          <p className="text-xs md:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Whether you are looking for pure organic food, home farming setups, or workplace safety leadership, we welcome you to join our journey.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/shop"
              className="bg-accent hover:bg-amber-700 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              Shop Organic <ArrowRight size={14} />
            </Link>
            <Link
              to="/about"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
            >
              Read About Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MissionPage;
