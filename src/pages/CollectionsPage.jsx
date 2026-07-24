import React from "react";
import { collections } from "../data/collections";
import CollectionCard from "../components/utils/CollectionCard";
import Footer from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const CollectionsPage = () => {
  useDocumentTitle("Categories");

  return (
    <>
      <div className="py-6 animate-fade-in min-h-[60vh]">
        <h1 className="font-serif text-[2.5rem] md:text-[3rem] leading-none mb-2">Our Collections</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-8">Curated for every mood & occasion</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollectionsPage;
