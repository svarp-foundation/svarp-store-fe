import React, { useState } from "react";
import { Send, Leaf, Sparkles } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-4 animate-fade-in relative z-10">
      <div className="bg-gradient-to-r from-[#e8efe9] via-[#f4f7f2] to-[#faf9f5] rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Background micro leaf icons */}
        <Leaf size={120} className="absolute -left-10 -bottom-10 text-[#1e5e3a]/5 transform rotate-45 pointer-events-none" />
        <Sparkles size={80} className="absolute -right-6 -top-6 text-accent/10 pointer-events-none" />

        <div className="flex-1 text-center md:text-left flex flex-col gap-2 relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl font-black text-primary leading-tight">
            Subscribe to get special offers, health tips and updates.
          </h2>
        </div>

        <div className="flex-1 w-full max-w-md relative z-10">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={submitted ? "Thanks for subscribing! 💚" : "Enter your email address"}
              disabled={submitted}
              required
              className="flex-grow bg-white border border-[#1e5e3a]/15 rounded-full px-5 py-3 outline-none focus:border-[#1e5e3a] transition-colors text-sm text-[#2d3a30] shadow-inner disabled:bg-emerald-50 disabled:text-emerald-800"
            />
            <button
              type="submit"
              disabled={submitted}
              className="bg-[#1e5e3a] hover:bg-[#15462a] text-white px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#1e5e3a]/15 flex items-center gap-2 flex-shrink-0 disabled:bg-emerald-700"
            >
              Subscribe
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
