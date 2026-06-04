import React from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const CollectionCard = ({ collection }) => {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(collection.filter)}`}
      className="group flex flex-col items-center bg-white/60 hover:bg-white p-6 rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center"
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#e8efe9] to-[#c6ded1] flex items-center justify-center text-[#1e5e3a] mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-inner relative">
        <Leaf size={32} className="fill-[#1e5e3a]/5" />
        <span className="absolute text-xs font-bold opacity-10 uppercase tracking-widest">SVARP</span>
      </div>
      <h3 className="font-serif text-lg font-bold text-primary group-hover:text-accent transition-colors leading-tight mb-1">
        {collection.name}
      </h3>
      <p className="text-xs text-[#2d3a30]/65 leading-relaxed">
        {collection.description}
      </p>
    </Link>
  );
};

export default CollectionCard;
