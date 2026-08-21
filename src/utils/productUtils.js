/**
 * Centralized Product Data Utility Helpers
 */

export const getProductImage = (prod, fallback = "/images/placeholder.webp") => {
  if (!prod) return fallback;
  if (prod.image) return prod.image;
  if (prod.images && Array.isArray(prod.images) && prod.images.length > 0 && prod.images[0]) {
    return prod.images[0];
  }

  const variants = prod.real_variants || prod.variants || [];
  for (const v of variants) {
    if (v.images && Array.isArray(v.images) && v.images.length > 0 && v.images[0]) {
      return v.images[0];
    }
    if (v.image) {
      return v.image;
    }
  }

  return fallback;
};

export const getProductPrice = (prod, fallbackPrice = 199) => {
  if (!prod) return fallbackPrice;
  if (prod.real_variants && Array.isArray(prod.real_variants) && prod.real_variants.length > 0) {
    const prices = prod.real_variants.map((v) => v.price).filter((p) => typeof p === "number" && !isNaN(p));
    if (prices.length > 0) return Math.min(...prices);
  }
  if (prod.variants && Array.isArray(prod.variants) && prod.variants.length > 0) {
    const prices = prod.variants.map((v) => v.price).filter((p) => typeof p === "number" && !isNaN(p));
    if (prices.length > 0) return Math.min(...prices);
  }
  return typeof prod.price === "number" ? prod.price : (prod.base_price || fallbackPrice);
};
