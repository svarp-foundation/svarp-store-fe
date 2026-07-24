import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/utils/ProductCard";
import { useProducts } from "../contexts/ProductContext";
import Footer from "../components/Footer";
import { SlidersHorizontal } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Products = () => {
  useDocumentTitle("Shop Organic Products");
  const { products, loading, error } = useProducts();
  const location = useLocation();
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      q: params.get("q")?.toLowerCase() || "",
      category: params.get("category")?.toLowerCase() || "",
    };
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by Search Query
    if (queryParams.q) {
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(queryParams.q) ||
          p.description?.toLowerCase().includes(queryParams.q) ||
          p.sku?.toLowerCase().includes(queryParams.q)
      );
    }

    // Filter by Category parameter (e.g. Wellness, Food, Oils, Farming)
    if (queryParams.category) {
      filtered = filtered.filter((p) => {
        const cat = p.category?.toLowerCase() || "";
        const name = p.name?.toLowerCase() || "";
        const desc = p.description?.toLowerCase() || "";
        
        // Match product attributes/tags
        if (queryParams.category === "food") {
          return cat.includes("food") || name.includes("turmeric") || name.includes("nuts") || name.includes("snack");
        } else if (queryParams.category === "oils") {
          return cat.includes("oil") || name.includes("oil");
        } else if (queryParams.category === "farming") {
          return cat.includes("farming") || name.includes("hydroponic") || name.includes("kit");
        } else if (queryParams.category === "wellness") {
          return cat.includes("wellness") || cat.includes("supplement") || name.includes("ashwagandha") || name.includes("capsule");
        }
        return cat.includes(queryParams.category) || desc.includes(queryParams.category);
      });
    }

    // Sort items
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [products, queryParams, sortBy]);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1e5e3a] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-serif">Error: {error}</div>
    );

  return (
    <>
      <div className="py-6 animate-fade-in min-h-[60vh] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="font-serif text-[2.4rem] md:text-[2.8rem] leading-none mb-3 text-primary font-black">
              {queryParams.q
                ? `Search: "${queryParams.q}"`
                : queryParams.category
                ? `Category: ${queryParams.category.toUpperCase()}`
                : "All Organic Products"}
            </h1>
            <p className="text-xs text-[#2d3a30]/50 tracking-wider">
              {filteredProducts.length} Premium items ready for you
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary/70 hover:text-accent transition-colors border border-primary/10 rounded-full px-4 py-2"
            >
              <SlidersHorizontal size={14} /> Filter
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs uppercase tracking-wider text-primary/70 bg-white border border-primary/10 rounded-full px-4 py-2 outline-none cursor-pointer"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="min-h-[40vh] flex flex-col items-center justify-center border border-dashed border-primary/10 rounded-3xl bg-white/40">
            <h2 className="font-serif text-xl mb-3 text-primary font-bold">
              No products found
            </h2>
            <p className="text-sm text-[#2d3a30]/50 max-w-sm text-center">
              Try searching for other organic products or checkout our popular wellness categories.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Products;
