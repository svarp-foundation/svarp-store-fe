import React from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Star, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const imageUrl = product.image || product.images?.[0] || "/images/placeholder.webp";

  // Mock pricing and reviews for premium mockup fidelity matching the user's design image
  const originalPrice = product.price ? Math.round(product.price * 1.25) : 249;
  const rating = product.rating || (4 + Math.random() * 0.9).toFixed(1);
  const reviewsCount = product.reviews_count || Math.floor(30 + Math.random() * 150);

  const displayPrice = () => {
    if (product.real_variants && product.real_variants.length > 0) {
      return Math.min(...product.real_variants.map((v) => v.price));
    }
    return typeof product.price === "number" ? product.price : 199;
  };

  const finalPrice = displayPrice();

  return (
    <div className="bg-white rounded-[24px] p-4 flex flex-col justify-between border border-[#1e5e3a]/5 hover:border-[#1e5e3a]/15 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
      {/* Discount Badge */}
      <span className="absolute top-4 left-4 z-10 bg-[#e8efe9] text-[#1e5e3a] text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
        20% OFF
      </span>

      <Link
        to={`/product/${product.id}`}
        className="w-full aspect-square flex justify-center items-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500 rounded-2xl bg-[#faf9f5]"
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:rotate-2"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#1e5e3a]/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </Link>

      <div className="mt-4 flex flex-col gap-1.5 flex-grow">
        {/* Rating Stars row */}
        <div className="flex items-center gap-1">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(rating) ? "currentColor" : "none"}
                className="stroke-current"
              />
            ))}
          </div>
          <span className="text-[10px] text-[#2d3a30]/50 font-bold">({reviewsCount})</span>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.id}`} className="hover:text-accent transition-colors block">
          <h3 className="text-sm font-serif font-bold text-primary capitalize line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Pricing Row */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-bold text-primary">₹{finalPrice}</span>
          <span className="text-xs text-[#2d3a30]/40 line-through">₹{originalPrice}</span>
          <span className="text-[10px] text-[#1e5e3a] font-bold">20% OFF</span>
        </div>
      </div>

      {/* Button Row */}
      <div className="flex gap-2 w-full mt-4">
        {product.real_variants && product.real_variants.length > 0 ? (
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-[11px] bg-[#1e5e3a] hover:bg-[#15462a] text-white py-2.5 flex items-center justify-center rounded-full uppercase tracking-wider font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#1e5e3a]/15"
          >
            Choose Option
          </Link>
        ) : (
          <Button
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
            className="flex-1 text-[11px] bg-[#1e5e3a] hover:bg-[#15462a] text-white py-2.5 flex items-center justify-center rounded-full uppercase tracking-wider font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#1e5e3a]/15 gap-2"
          >
            <ShoppingCart size={13} />
            Add To Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
