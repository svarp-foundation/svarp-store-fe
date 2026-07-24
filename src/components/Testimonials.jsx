import React, { useState, useEffect } from "react";
import { testimonials } from "../data/testimonials";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-6 animate-fade-in relative z-10">
      <div className="flex flex-col items-center mb-6 text-center">
        <h2 className="font-serif text-[2.2rem] md:text-[2.6rem] font-black text-primary leading-none">
          What Our Customers Say
        </h2>
        <div className="w-12 h-1 bg-accent/40 rounded-full mt-2 mb-2"></div>
        <p className="text-[#2d3a30]/65 text-xs sm:text-sm max-w-xl">
          Real feedback from our community on the impact of natural living.
        </p>
      </div>

      {/* Carousel Container */}
      <div
        className="max-w-3xl mx-auto px-2 sm:px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1e5e3a]/10 shadow-sm hover:shadow-md transition-all duration-500 relative min-h-[180px] flex flex-col justify-between overflow-hidden">
          <Quote className="absolute top-4 right-4 w-14 h-14 text-[#1e5e3a]/5 pointer-events-none" />

          {/* Slide Content */}
          <div key={currentIndex} className="animate-fade-in space-y-4 relative z-10">
            {/* Stars */}
            <div className="flex gap-1 text-amber-400">
              {[...Array(currentTestimonial.rating || 5)].map((_, j) => (
                <Star key={j} size={16} className="fill-current" />
              ))}
            </div>

            {/* Review text */}
            <p className="text-sm sm:text-base text-[#2d3a30]/85 italic leading-relaxed">
              &ldquo;{currentTestimonial.review}&rdquo;
            </p>

            {/* Reviewer info */}
            <div className="pt-2 border-t border-[#1e5e3a]/10 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#1e5e3a] uppercase tracking-wider">
                  {currentTestimonial.name}
                </p>
                {currentTestimonial.role && (
                  <span className="text-[10px] text-accent font-semibold tracking-wide block">
                    {currentTestimonial.role}
                  </span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#1e5e3a]/60 bg-[#1e5e3a]/5 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest">
                Verified Review
              </span>
            </div>
          </div>
        </div>

        {/* Integrated Bottom Navigation & Dot Indicators */}
        <div className="flex justify-center items-center gap-4 mt-5">
          <button
            onClick={prevSlide}
            aria-label="Previous review"
            className="w-9 h-9 rounded-full bg-white shadow-sm border border-[#1e5e3a]/15 flex items-center justify-center text-[#1e5e3a] hover:bg-[#1e5e3a] hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? "w-7 h-2.5 bg-[#1e5e3a]"
                    : "w-2.5 h-2.5 bg-[#1e5e3a]/25 hover:bg-[#1e5e3a]/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next review"
            className="w-9 h-9 rounded-full bg-white shadow-sm border border-[#1e5e3a]/15 flex items-center justify-center text-[#1e5e3a] hover:bg-[#1e5e3a] hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
