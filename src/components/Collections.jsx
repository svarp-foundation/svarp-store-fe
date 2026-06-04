import React from "react";
import { collections } from "../data/collections";
import CollectionCard from "./utils/CollectionCard";

const Collections = () => {
  return (
    <section className="py-12 animate-fade-in relative z-10">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="font-serif text-[2.2rem] md:text-[2.6rem] font-black text-primary">Shop by Categories</h2>
        <div className="w-12 h-1 bg-accent/40 rounded-full mt-2 mb-3"></div>
        <p className="text-[#2d3a30]/65 text-sm max-w-xl">
          Explore our wide range of natural and sustainable categories curated for you and your family.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>
    </section>
  );
};

export default Collections;
