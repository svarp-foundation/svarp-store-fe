import React from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Star, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const getProductImage = (prod) => {
    if (prod.image) return prod.image;
    if (prod.images && prod.images.length > 0 && prod.images[0]) return prod.images[0];

    const variants = prod.real_variants || prod.variants || [];
    for (const v of variants) {
      if (v.images && Array.isArray(v.images) && v.images.length > 0 && v.images[0]) {
        return v.images[0];
      }
      if (v.image) {
        return v.image;
      }
    }
    return "/images/placeholder.webp";
  };

  const imageUrl = getProductImage(product);

  // Mock pricing and reviews for premium mockup fidelity matching the user's design image
  const originalPrice = product.mrp || product.base_price || product.oldPrice;
  const discountLabel = product.discount || (originalPrice && product.price && originalPrice > product.price ? `${Math.round((1 - product.price / originalPrice) * 100)}% OFF` : null);
  const rating = product.rating || 4.8;
  const reviewsCount = product.reviews_count || 42;

  const displayPrice = () => {
    if (product.real_variants && product.real_variants.length > 0) {
      return Math.min(...product.real_variants.map((v) => v.price));
    }
    return typeof product.price === "number" ? product.price : 199;
  };

  const finalPrice = displayPrice();

  return (
    <div className="bg-white rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 flex flex-col justify-between border border-[#1e5e3a]/5 hover:border-[#1e5e3a]/15 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
      {/* Discount Badge */}
      {discountLabel && (
        <span className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 bg-[#e8efe9] text-[#1e5e3a] text-[9px] sm:text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-bold uppercase tracking-wider">
          {discountLabel}
        </span>
      )}

      <Link
        to={`/product/${product.id}`}
        className="w-full aspect-square flex justify-center items-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500 rounded-xl sm:rounded-2xl bg-[#faf9f5]"
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:rotate-2"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#1e5e3a]/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </Link>

      <div className="mt-2.5 sm:mt-4 flex flex-col gap-1 sm:gap-1.5 flex-grow">
        {/* Rating Stars row */}
        <div className="flex items-center gap-1">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                fill={i < Math.floor(rating) ? "currentColor" : "none"}
                className="stroke-current sm:w-3 sm:h-3"
              />
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] text-[#2d3a30]/50 font-bold">({reviewsCount})</span>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.id}`} className="hover:text-accent transition-colors block">
          <h3 className="text-xs sm:text-sm font-serif font-bold text-primary capitalize line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Pricing Row */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
          <span className="text-sm sm:text-base font-bold text-primary">₹{finalPrice}</span>
          {originalPrice && originalPrice > finalPrice && (
            <span className="text-[10px] sm:text-xs text-[#2d3a30]/40 line-through">₹{originalPrice}</span>
          )}
          {discountLabel && (
            <span className="text-[9px] sm:text-[10px] text-[#1e5e3a] font-bold">{discountLabel}</span>
          )}
        </div>
      </div>

      {/* Button Row */}
      <div className="flex gap-2 w-full mt-2.5 sm:mt-4">
        {product.real_variants && product.real_variants.length > 0 ? (
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-[10px] sm:text-[11px] bg-[#1e5e3a] hover:bg-[#15462a] text-white py-2 sm:py-2.5 flex items-center justify-center rounded-full uppercase tracking-wider font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#1e5e3a]/15"
          >
            Choose Option
          </Link>
        ) : (
          <Button
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
            className="flex-1 text-[10px] sm:text-[11px] bg-[#1e5e3a] hover:bg-[#15462a] text-white py-2 sm:py-2.5 flex items-center justify-center rounded-full uppercase tracking-wider font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#1e5e3a]/15 gap-1.5"
          >
            <ShoppingCart size={12} className="sm:w-3.5 sm:h-3.5" />
            Add To Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
