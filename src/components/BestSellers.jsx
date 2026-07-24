import React from "react";
import ProductCard from "./utils/ProductCard";
import { useProducts } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BestSellers = () => {
  const { products, loading } = useProducts();
  const bestSellers = products.slice(0, 4);

  if (loading) {
    return (
      <section className="py-12 animate-fade-in relative z-10">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] font-black text-primary">Best Sellers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-[380px] rounded-[24px]"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 animate-fade-in relative z-10">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="font-serif text-[2.2rem] md:text-[2.6rem] font-black text-primary leading-none">Best Sellers</h2>
          <div className="w-12 h-1 bg-[#1e5e3a]/30 rounded-full mt-2"></div>
        </div>
        <Link
          to="/shop"
          className="text-xs uppercase tracking-widest text-[#1e5e3a] font-bold flex items-center gap-1 hover:text-accent transition-colors group"
        >
          View All
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
