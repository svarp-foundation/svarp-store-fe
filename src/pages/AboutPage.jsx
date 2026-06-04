import React from "react";
import Footer from "../components/Footer";
import { Heart, Leaf, Shield, Globe } from "lucide-react";

const AboutPage = () => {
  const values = [
    { icon: <Heart size={28} className="text-brand-primary" />, title: "Wellness First", desc: "We prioritize natural well-being and health in every product we offer." },
    { icon: <Leaf size={28} className="text-brand-primary" />, title: "100% Sustainable", desc: "Responsibly sourced organic materials and fully eco-conscious packaging." },
    { icon: <Shield size={28} className="text-brand-primary" />, title: "Certified Organic", desc: "Rigorous standards to ensure premium quality products you can fully trust." },
    { icon: <Globe size={28} className="text-brand-primary" />, title: "Green Planet", desc: "Empowering communities through farming setups and sustainable practices." },
  ];

  return (
    <>
      <div className="py-6 animate-fade-in min-h-[60vh]">
        <div className="text-center mb-12">
          <h1 className="font-serif text-[2.5rem] md:text-[3rem] leading-none mb-4 text-brand-primary">Our Story</h1>
          <p className="text-brand-dark-semi max-w-2xl mx-auto leading-relaxed">
            Born from a deep commitment to sustainable living and holistic wellness, SVARP Body Wellness represents the peak of organic care, healthy nutrition, and eco-friendly farming setups.
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 md:p-12 mb-12 border border-brand-primary-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">Promoting Sustainability & Health</h2>
              <p className="text-brand-dark-light leading-relaxed mb-4 text-sm">
                At SVARP Body Wellness, we believe that a healthy lifestyle starts with natural choices. We work closely with certified local farmers and wellness experts to bring you the purest spices, cold-pressed oils, and health-boosting herbal supplements.
              </p>
              <p className="text-brand-dark-light leading-relaxed text-sm">
                Additionally, we pioneer smart urban agricultural setups like home hydroponics, poly houses, and vertical farming systems to help every family cultivate fresh organic foods right at home.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#e8efe9] to-[#c6ded1] rounded-2xl h-[300px] flex flex-col items-center justify-center border border-white/50 relative overflow-hidden group">
              <img 
                src="https://svarp.org/company/svarp-logo.webp" 
                alt="SVARP Logo" 
                className="h-16 w-auto object-contain mb-4 group-hover:scale-105 transition-transform duration-500"
              />
              <span className="font-serif text-2xl font-bold text-brand-primary mt-2">SVARP BODY WELLNESS</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-primary-75 mt-1 font-sans">Body · Wellness · Sustainability</span>
            </div>
          </div>
        </div>

        <h2 className="font-serif text-2xl text-center text-brand-primary mb-8 font-bold">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-brand-primary-5 text-center hover:shadow-lg transition-all duration-300">
              <div className="mb-3 flex justify-center">{v.icon}</div>
              <h3 className="font-serif font-bold text-base text-primary mb-2">{v.title}</h3>
              <p className="text-xs text-brand-dark-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
