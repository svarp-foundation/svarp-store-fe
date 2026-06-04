import React, { useState } from "react";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Send, Leaf } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <div className="py-6 animate-fade-in min-h-[60vh]">
        <div className="text-center mb-12">
          <h1 className="font-serif text-[2.5rem] md:text-[3rem] leading-none mb-4 text-brand-primary">Contact Us</h1>
          <p className="text-brand-dark-muted max-w-xl mx-auto text-sm">
            We'd love to hear from you. Send us a message or visit us, and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Card Grid */}
          <div className="flex flex-col gap-6">
            {[
              { icon: <Mail size={22} className="text-brand-primary" />, title: "Email", info: "support@svarpbodywellness.org", link: "mailto:support@svarpbodywellness.org" },
              { icon: <Phone size={22} className="text-brand-primary" />, title: "Phone", info: "+91 12345 67890", link: "tel:+911234567890" },
              { icon: <MapPin size={22} className="text-brand-primary" />, title: "Address", info: "123, Green Avenue, Eco City, India - 560001", link: null },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-brand-primary-5 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-primary-10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="font-bold text-sm text-primary mb-1">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} className="text-xs text-brand-dark-semi hover:text-accent transition-colors break-all leading-relaxed">
                      {item.info}
                    </a>
                  ) : (
                    <p className="text-xs text-brand-dark-semi leading-relaxed">{item.info}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-brand-primary-5 shadow-sm">
            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm text-center font-medium">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="text-left">
                  <label className="block text-xs uppercase tracking-wider text-primary/60 mb-2 font-bold pl-1">Your Name</label>
                  <input
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-primary-10 text-sm focus:outline-none focus:border-accent transition-all text-brand-dark-light"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-xs uppercase tracking-wider text-primary/60 mb-2 font-bold pl-1">Email</label>
                  <input
                    type="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-primary-10 text-sm focus:outline-none focus:border-accent transition-all text-brand-dark-light"
                  />
                </div>
              </div>
              <div className="text-left">
                <label className="block text-xs uppercase tracking-wider text-primary/60 mb-2 font-bold pl-1">Subject</label>
                <input
                  type="text" required value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-primary-10 text-sm focus:outline-none focus:border-accent transition-all text-brand-dark-light"
                />
              </div>
              <div className="text-left">
                <label className="block text-xs uppercase tracking-wider text-primary/60 mb-2 font-bold pl-1">Message</label>
                <textarea
                  required rows={5} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-primary-10 text-sm focus:outline-none focus:border-accent transition-all resize-none text-brand-dark-light"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-primary bg-brand-primary-hover text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg text-sm"
              >
                <Send size={15} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
