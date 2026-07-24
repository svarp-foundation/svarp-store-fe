import { Link } from "react-router-dom";
import { Leaf, ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#faf9f5] via-[#f4f7f2] to-[#e9f2e7] p-6 md:p-8 lg:p-10 border border-white/50 mb-6 flex flex-col lg:flex-row items-center justify-between gap-8 animate-fade-in">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1e5e3a]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Left Content */}
      <div className="flex-1 flex flex-col gap-6 items-start text-left max-w-2xl relative z-10">

        <h1 className="text-[2.6rem] md:text-[4rem] leading-[1.1] text-[#1e5e3a] font-serif font-black">
          Sustainable Products <br />
          <span className="text-accent">for a Better Tomorrow</span>
        </h1>

        <p className="text-[1.05rem] md:text-[1.15rem] text-[#2d3a30]/80 max-w-[540px] leading-relaxed">
          Explore our wide range of organic, natural and sustainable products for you and your loved ones. Specially crafted for holistic well-being.
        </p>

        <div className="flex flex-wrap gap-4 mt-2">
          <Link
            to="/shop"
            className="bg-[#1e5e3a] hover:bg-[#15462a] text-white px-8 py-4 rounded-full font-medium text-base flex items-center gap-3 shadow-lg shadow-[#1e5e3a]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[#1e5e3a]/30 group"
          >
            Shop Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/mission"
            className="bg-white/80 hover:bg-white text-primary border border-[#1e5e3a]/15 px-8 py-4 rounded-full font-medium text-base flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
          >
            Our Mission
          </Link>
        </div>

        {/* Dynamic Micro Feature badging */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-6 border-t border-[#1e5e3a]/10 w-full">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck size={18} className="text-[#1e5e3a]" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#2d3a30]/75">100% Organic</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles size={18} className="text-accent" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#2d3a30]/75">Eco Friendly</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Truck size={18} className="text-[#1e5e3a]" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#2d3a30]/75">Fast Delivery</span>
          </div>
        </div>
      </div>

      {/* Hero Right Media / Artwork Card */}
      <div className="flex-1 w-full max-w-xl relative flex justify-center items-center">
        {/* Soft elegant glass card cluster representing SVARP products */}
        <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center">
          {/* Glass background plate */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/60 shadow-2xl overflow-hidden group">
            {/* Visual Abstract representing natural items */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1e5e3a]/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>

            {/* Inner aesthetic grid of organic showcase items */}
            <div className="relative z-10 p-8 w-full h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1e5e3a] bg-[#1e5e3a]/10 px-3 py-1 rounded-full">
                  Wellness Series
                </span>
                <span className="text-xs text-accent font-serif italic">✦ Pure & Certified</span>
              </div>

              {/* Central Premium Graphic */}
              <div className="flex flex-col items-center justify-center my-auto py-4">
                <div className="relative">
                  <div className="w-32 h-44 rounded-[20px] bg-gradient-to-b from-[#e8efe9] to-[#c6ded1] shadow-xl border border-white/50 flex flex-col justify-between p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                    <Leaf size={20} className="text-[#1e5e3a]" />
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#1e5e3a]/60">SVARP</span>
                      <span className="font-serif text-sm font-bold text-[#1e5e3a] leading-none">Organic Oil</span>
                    </div>
                  </div>

                  <div className="w-28 h-36 rounded-[20px] bg-gradient-to-b from-[#faf5eb] to-[#eadecc] shadow-lg border border-white/50 flex flex-col justify-between p-4 absolute -bottom-6 -right-12 transform rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer z-10">
                    <Sparkles size={16} className="text-accent" />
                    <div className="flex flex-col text-left">
                      <span className="text-[8px] uppercase tracking-wider font-bold text-accent/80">SVARP</span>
                      <span className="font-serif text-xs font-bold text-primary leading-none">Herbs Extra</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-[#1e5e3a]/10 pt-4">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase text-[#2d3a30]/50 tracking-wider">Starting at</span>
                  <span className="text-xl font-bold font-serif text-[#1e5e3a]">₹199.00</span>
                </div>
                <span className="text-xs text-[#2d3a30]/70 font-medium">Over 50+ natural solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
