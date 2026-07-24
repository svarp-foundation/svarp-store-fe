import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { api } from "../utils/api";
import Footer from "../components/Footer";
import { ShoppingBag, ChevronLeft, Star, Minus, Plus, Tag, Check, Sparkles } from "lucide-react";

export const formatVariantTitle = (v) => {
  if (!v) return "Standard Item";
  const parts = [];
  if (v.attributes && typeof v.attributes === "object" && Object.keys(v.attributes).length > 0) {
    Object.entries(v.attributes).forEach(([k, val]) => {
      if (val) parts.push(`${k}: ${val}`);
    });
  }
  if (parts.length === 0) {
    if (v.size) parts.push(`Size: ${v.size}`);
    if (v.color) parts.push(`Color: ${v.color}`);
    if (v.weight) parts.push(`Weight: ${v.weight}`);
  }
  return parts.length > 0 ? parts.join(" / ") : (v.weight || v.name || v.sku || "Variant");
};

const getColorSwatch = (colorName) => {
  if (!colorName || typeof colorName !== "string") return null;
  const name = colorName.trim().toLowerCase();

  const colorMap = {
    red: "#dc2626",
    green: "#16a34a",
    blue: "#2563eb",
    white: "#ffffff",
    black: "#111827",
    yellow: "#eab308",
    purple: "#9333ea",
    pink: "#ec4899",
    orange: "#f97316",
    gray: "#4b5563",
    grey: "#4b5563",
    navy: "#1e3a8a",
    brown: "#78350f",
    gold: "#d97706",
    silver: "#94a3b8",
    cyan: "#06b6d4",
    teal: "#0d9488",
    lime: "#65a30d",
    indigo: "#4f46e5",
    cream: "#fef3c7",
    beige: "#f5f5dc",
    maroon: "#800000",
  };

  for (const [k, v] of Object.entries(colorMap)) {
    if (name.includes(k)) {
      return {
        hex: v,
        isLight: v === "#ffffff" || v === "#fef3c7" || v === "#f5f5dc" || name.includes("white") || name.includes("yellow"),
      };
    }
  }

  return null;
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          const variantsList = data.real_variants || data.variants || [];
          if (variantsList.length > 0) {
            setSelectedVariant(variantsList[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const variantsList = React.useMemo(() => {
    if (!product) return [];
    return product.real_variants || product.variants || [];
  }, [product]);

  const attributeGroups = React.useMemo(() => {
    if (!variantsList || variantsList.length === 0) return [];

    if (product?.variant_types && Array.isArray(product.variant_types) && product.variant_types.length > 0) {
      return product.variant_types.map((vt) => ({
        name: vt.name,
        options: vt.options || [],
      }));
    }

    const map = {};
    variantsList.forEach((v) => {
      if (v.attributes && typeof v.attributes === "object" && Object.keys(v.attributes).length > 0) {
        Object.entries(v.attributes).forEach(([k, val]) => {
          if (val) {
            if (!map[k]) map[k] = [];
            if (!map[k].includes(val)) map[k].push(val);
          }
        });
      } else {
        if (v.color) {
          if (!map["Color"]) map["Color"] = [];
          if (!map["Color"].includes(v.color)) map["Color"].push(v.color);
        }
        if (v.size) {
          if (!map["Size"]) map["Size"] = [];
          if (!map["Size"].includes(v.size)) map["Size"].push(v.size);
        }
        if (v.weight) {
          if (!map["Weight"]) map["Weight"] = [];
          if (!map["Weight"].includes(v.weight)) map["Weight"].push(v.weight);
        }
      }
    });

    return Object.entries(map).map(([name, options]) => ({
      name,
      options,
    }));
  }, [product, variantsList]);

  const activeImages = React.useMemo(() => {
    if (selectedVariant?.images && Array.isArray(selectedVariant.images) && selectedVariant.images.length > 0) {
      return selectedVariant.images;
    }
    if (selectedVariant?.image) {
      return [selectedVariant.image];
    }
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    if (product?.image) {
      return [product.image];
    }
    return ["/images/placeholder.webp"];
  }, [selectedVariant, product]);

  // Reset active image index whenever selected variant changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedVariant?.id]);

  const activeImagesKey = activeImages.join(",");

  // Auto-slide image gallery every 3 seconds when multiple images exist
  useEffect(() => {
    if (!activeImages || activeImages.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % activeImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeImagesKey]);

  const getSelectedAttrValue = (attrName) => {
    if (!selectedVariant) return "";
    if (selectedVariant.attributes && selectedVariant.attributes[attrName]) {
      return selectedVariant.attributes[attrName];
    }
    if (attrName.toLowerCase() === "color") return selectedVariant.color || "";
    if (attrName.toLowerCase() === "size") return selectedVariant.size || "";
    if (attrName.toLowerCase() === "weight") return selectedVariant.weight || "";
    return "";
  };

  const handleSelectAttributeOption = (attrName, optionVal) => {
    const currentAttrs = {};
    if (selectedVariant?.attributes) {
      Object.assign(currentAttrs, selectedVariant.attributes);
    } else {
      if (selectedVariant?.color) currentAttrs["Color"] = selectedVariant.color;
      if (selectedVariant?.size) currentAttrs["Size"] = selectedVariant.size;
      if (selectedVariant?.weight) currentAttrs["Weight"] = selectedVariant.weight;
    }

    const updatedAttrs = {
      ...currentAttrs,
      [attrName]: optionVal,
    };

    let match = variantsList.find((v) => {
      const vAttrs = v.attributes || {
        Color: v.color,
        Size: v.size,
        Weight: v.weight,
      };
      return Object.entries(updatedAttrs).every(([k, val]) => vAttrs[k] === val);
    });

    if (!match) {
      match = variantsList.find((v) => {
        const vAttrs = v.attributes || {
          Color: v.color,
          Size: v.size,
          Weight: v.weight,
        };
        return vAttrs[attrName] === optionVal;
      });
    }

    if (match) {
      setSelectedVariant(match);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: selectedVariant ? selectedVariant.price : product.price,
      image: selectedVariant?.images?.[0] || selectedVariant?.image || product.image || product.images?.[0],
      variant_id: selectedVariant?.id || null,
      variant_name: selectedVariant ? formatVariantTitle(selectedVariant) : null,
      sku: selectedVariant?.sku || product.sku,
      variant_attributes: selectedVariant?.attributes || null,
    };
    for (let i = 0; i < quantity; i++) {
      addToCart(cartItem);
    }
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-2xl mb-4">Product not found</h2>
        <button onClick={() => navigate("/shop")} className="text-accent underline">Back to Shop</button>
      </div>
    );
  }

  const imageUrl = (activeImages && activeImages[activeImageIndex]) || activeImages[0] || "/images/placeholder.webp";
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentStock = selectedVariant && selectedVariant.stock !== undefined ? selectedVariant.stock : product.stock_quantity;

  return (
    <>
      <div className="py-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-primary/60 hover:text-accent mb-4 transition-colors">
          <ChevronLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Image */}
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center justify-center min-h-[320px] border border-white/20 relative">
            <img src={imageUrl} alt={product.name} className="max-h-[400px] object-contain transition-opacity duration-300" />
            {activeImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto p-1 max-w-full">
                {activeImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumb ${idx}`}
                    className={`w-14 h-14 rounded-xl object-cover border cursor-pointer transition-all ${idx === activeImageIndex ? "border-accent ring-2 ring-accent/30 scale-105" : "border-white/40 opacity-70 hover:opacity-100"}`}
                    onClick={() => setActiveImageIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              {product.tag ? (
                <span className="bg-[#f7d7c4] text-primary text-[0.7rem] px-3 py-1 rounded-full font-bold uppercase tracking-wider w-fit">
                  {product.tag}
                </span>
              ) : (
                <span className="bg-emerald-100 text-emerald-800 text-[0.7rem] px-3 py-1 rounded-full font-bold uppercase tracking-wider w-fit flex items-center gap-1">
                  <Sparkles size={12} /> Organic Verified
                </span>
              )}
              <span className="font-mono text-xs text-primary/40 uppercase">
                SKU: {selectedVariant?.sku || product.sku}
              </span>
            </div>

            <h1 className="font-serif text-[2rem] md:text-[2.5rem] leading-tight capitalize">{product.name}</h1>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-accent">
                {typeof currentPrice === "number" ? `₹${currentPrice}` : currentPrice}
              </span>
              {currentStock !== null && currentStock !== undefined && (
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${currentStock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {currentStock > 0 ? `${currentStock} in stock` : "Out of stock"}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-[0.95rem] text-primary/70 leading-relaxed">{product.description}</p>
            )}

            {/* Checkbox Attribute Selection Section */}
            {variantsList.length > 0 && (
              <div className="space-y-4 bg-white/50 p-5 rounded-2xl border border-primary/10 shadow-sm">
                <div className="flex items-center justify-between border-b border-primary/5 pb-3">
                  <h3 className="text-xs uppercase tracking-wider text-primary/80 font-bold flex items-center gap-1.5">
                    <Tag size={13} /> Select Variant Options
                  </h3>
                  {selectedVariant && (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                      {formatVariantTitle(selectedVariant)} — ₹{selectedVariant.price}
                    </span>
                  )}
                </div>

                {attributeGroups.length > 0 ? (
                  <div className="space-y-4">
                    {attributeGroups.map((group) => {
                      const selectedVal = getSelectedAttrValue(group.name);
                      const isColorGroup = group.name.toLowerCase() === "color" || group.name.toLowerCase().includes("color");

                      return (
                        <div key={group.name} className="space-y-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-primary/70 flex items-center gap-2">
                            <span>{group.name}:</span>
                            <span className="text-accent font-black">{selectedVal || "Select option"}</span>
                          </div>
                          <div className="flex flex-wrap gap-2.5">
                            {group.options.map((opt) => {
                              const isSelected = selectedVal === opt;
                              const swatch = isColorGroup ? getColorSwatch(opt) : null;

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleSelectAttributeOption(group.name, opt)}
                                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer select-none ${
                                    isSelected
                                      ? "scale-[1.02] shadow-md"
                                      : "hover:border-accent hover:bg-white"
                                  }`}
                                  style={{
                                    backgroundColor: isSelected ? "#1e5e3a" : "rgba(255, 255, 255, 0.9)",
                                    color: isSelected ? "#ffffff" : "#20362a",
                                    borderColor: isSelected ? "#1e5e3a" : "rgba(30, 94, 58, 0.2)",
                                  }}
                                >
                                  {/* Checkbox Icon */}
                                  <div
                                    className="w-4 h-4 rounded border flex items-center justify-center transition-colors"
                                    style={{
                                      backgroundColor: isSelected ? "#ffffff" : "#f9fafb",
                                      borderColor: isSelected ? "#ffffff" : "rgba(30, 94, 58, 0.3)",
                                      color: isSelected ? "#1e5e3a" : "transparent",
                                    }}
                                  >
                                    <Check size={11} strokeWidth={3.5} />
                                  </div>

                                  {/* Color Swatch Circle */}
                                  {swatch && (
                                    <span
                                      className="w-4 h-4 rounded-full border flex-shrink-0 inline-block shadow-xs"
                                      style={{
                                        backgroundColor: swatch.hex,
                                        borderColor: swatch.isLight ? "rgba(0,0,0,0.25)" : "transparent",
                                      }}
                                    />
                                  )}

                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Fallback to simple list if no attributes extracted */
                  <div className="flex flex-wrap gap-2.5">
                    {variantsList.map((v) => {
                      const title = formatVariantTitle(v);
                      const isSelected = selectedVariant?.id === v.id || selectedVariant?.sku === v.sku;
                      return (
                        <button
                          key={v.id || v.sku}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer select-none ${
                            isSelected
                              ? "scale-[1.02] shadow-md"
                              : "hover:border-accent hover:bg-white"
                          }`}
                          style={{
                            backgroundColor: isSelected ? "#1e5e3a" : "rgba(255, 255, 255, 0.9)",
                            color: isSelected ? "#ffffff" : "#20362a",
                            borderColor: isSelected ? "#1e5e3a" : "rgba(30, 94, 58, 0.2)",
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded border flex items-center justify-center transition-colors"
                            style={{
                              backgroundColor: isSelected ? "#ffffff" : "#f9fafb",
                              borderColor: isSelected ? "#ffffff" : "rgba(30, 94, 58, 0.3)",
                              color: isSelected ? "#1e5e3a" : "transparent",
                            }}
                          >
                            <Check size={11} strokeWidth={3.5} />
                          </div>
                          <span>{title}</span>
                          <span style={{ color: isSelected ? "#a7f3d0" : "#c18c5d" }}>
                            — ₹{v.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-primary/50 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5 transition-colors">
                  <Minus size={16} />
                </button>
                <span className="text-lg font-bold min-w-[30px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={currentStock === 0}
              className="w-full md:w-auto px-10 py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(90,50,50,0.2)] transition-custom disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
              style={{
                backgroundColor: currentStock === 0 ? "rgba(30, 94, 58, 0.5)" : "#1e5e3a",
                color: "#ffffff"
              }}
            >
              <ShoppingBag size={18} /> Add to Cart — ₹{(typeof currentPrice === "number" ? currentPrice : 0) * quantity}
            </button>

            {/* Notes */}
            {product.notes && (
              <div className="border-t border-primary/5 pt-6 mt-2">
                <h3 className="font-serif text-lg font-bold mb-4">Fragrance Notes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(product.notes).map(([key, value]) => (
                    <div key={key} className="bg-white/30 rounded-xl p-4">
                      <h4 className="text-xs uppercase tracking-wider text-accent font-bold mb-2">{key} Notes</h4>
                      <p className="text-sm text-primary/70">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
