import React from "react";
import { testimonials } from "../data/testimonials";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-12 animate-fade-in relative z-10">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="font-serif text-[2.2rem] md:text-[2.6rem] font-black text-primary">What Our Customers Say</h2>
        <div className="w-12 h-1 bg-accent/40 rounded-full mt-2 mb-3"></div>
        <p className="text-[#2d3a30]/65 text-sm max-w-xl">
          Real feedback from our community on the impact of natural living.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-[#1e5e3a]/5 hover:border-[#1e5e3a]/15 shadow-sm hover:shadow-lg transition-all duration-300 relative group overflow-hidden">
            <Quote className="absolute top-4 right-4 w-12 h-12 text-[#1e5e3a]/5 group-hover:scale-110 transition-transform duration-500" />
            <div className="flex gap-1 mb-4 text-amber-400">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={14} className="fill-current" />
              ))}
            </div>
            <p className="text-sm text-[#2d3a30]/85 mb-4 leading-relaxed italic relative z-10">&ldquo;{t.review}&rdquo;</p>
            <p className="text-xs font-bold text-primary uppercase tracking-wider">&mdash; {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
