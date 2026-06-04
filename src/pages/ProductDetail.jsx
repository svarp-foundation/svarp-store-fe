import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { api } from "../utils/api";
import Footer from "../components/Footer";
import { ShoppingBag, ChevronLeft, Star, Minus, Plus } from "lucide-react";

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
          if (data.real_variants?.length > 0) {
            setSelectedVariant(data.real_variants[0]);
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
      variant_name: selectedVariant?.weight || selectedVariant?.name || null,
      sku: selectedVariant?.sku || product.sku,
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

  return (
    <>
      <div className="py-6 animate-fade-in">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-primary/60 hover:text-accent mb-8 transition-colors">
          <ChevronLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 flex items-center justify-center min-h-[400px] border border-white/20">
            <img src={imageUrl} alt={product.name} className="max-h-[400px] object-contain" />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            {product.tag && (
              <span className="bg-[#f7d7c4] text-primary text-[0.7rem] px-3 py-1 rounded-full font-bold uppercase tracking-wider w-fit">
                {product.tag}
              </span>
            )}
            <h1 className="font-serif text-[2rem] md:text-[2.5rem] leading-tight capitalize">{product.name}</h1>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-accent">
                {typeof currentPrice === "number" ? `₹${currentPrice}` : currentPrice}
              </span>
              {product.stock_quantity !== null && product.stock_quantity !== undefined && (
                <span className={`text-xs px-2 py-1 rounded-full ${product.stock_quantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-[0.95rem] text-primary/70 leading-relaxed">{product.description}</p>
            )}

            {/* Variants */}
            {product.real_variants && product.real_variants.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-wider text-primary/50 mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.real_variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-full text-sm border transition-custom ${
                        selectedVariant?.id === v.id
                          ? "border-primary"
                          : "border-primary/10 hover:border-accent"
                      }`}
                      style={
                        selectedVariant?.id === v.id
                          ? { backgroundColor: "#1e5e3a", color: "#ffffff" }
                          : { backgroundColor: "rgba(255, 255, 255, 0.5)", color: "#20362a" }
                      }
                    >
                      {v.weight || v.name} — ₹{v.price}
                    </button>
                  ))}
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
              disabled={product.stock_quantity === 0}
              className="w-full md:w-auto px-10 py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(90,50,50,0.2)] transition-custom disabled:opacity-50 disabled:hover:translate-y-0"
              style={{
                backgroundColor: product.stock_quantity === 0 ? "rgba(30, 94, 58, 0.5)" : "#1e5e3a",
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
