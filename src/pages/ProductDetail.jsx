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

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
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

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: selectedVariant ? selectedVariant.price : product.price,
      image: product.image || product.images?.[0],
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

  const imageUrl = product.image || product.images?.[0] || "/images/placeholder.webp";
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const variantsList = product.real_variants || product.variants || [];
  const currentStock = selectedVariant && selectedVariant.stock !== undefined ? selectedVariant.stock : product.stock_quantity;

  return (
    <>
      <div className="py-6 animate-fade-in">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-primary/60 hover:text-accent mb-8 transition-colors">
          <ChevronLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] border border-white/20 relative">
            <img src={imageUrl} alt={product.name} className="max-h-[400px] object-contain" />
            {product.images?.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto p-1">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumb ${idx}`}
                    className="w-12 h-12 rounded-xl object-cover border border-white/40 cursor-pointer hover:opacity-80"
                    onClick={() => setProduct({ ...product, image: img })}
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

            {/* Dynamic Multi-Variant Combinations Section */}
            {variantsList.length > 0 && (
              <div className="space-y-3 bg-white/40 p-4 rounded-2xl border border-primary/5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-wider text-primary/70 font-bold flex items-center gap-1.5">
                    <Tag size={13} /> Select Variant Option ({variantsList.length})
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {variantsList.map((v) => {
                    const title = formatVariantTitle(v);
                    const isSelected = selectedVariant?.id === v.id || selectedVariant?.sku === v.sku;
                    return (
                      <button
                        key={v.id || v.sku}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 ${
                          isSelected
                            ? "border-[#1e5e3a] bg-[#1e5e3a] text-white shadow-md scale-105"
                            : "border-primary/15 bg-white/60 text-primary hover:border-accent hover:bg-white"
                        }`}
                      >
                        {isSelected && <Check size={14} />}
                        <span>{title}</span>
                        <span className={isSelected ? "text-emerald-200" : "text-accent font-black"}>
                          — ₹{v.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
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
