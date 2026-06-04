import React from "react";
import { features } from "../data/features";

const Features = () => {
  return (
    <section className="py-8 md:py-12 animate-fade-in relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 transition-all duration-300 hover:scale-[1.02] ${
              index === 4 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1e5e3a]/10 flex items-center justify-center text-[#1e5e3a] flex-shrink-0">
              {feature.icon}
            </div>
            <div className="flex flex-col text-left">
              <h3 className="font-serif font-bold text-sm text-[#1e5e3a] leading-tight">{feature.title}</h3>
              <p className="text-[11px] text-[#2d3a30]/65 mt-0.5 whitespace-nowrap">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
