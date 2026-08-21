import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("svarp_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("svarp_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  const addToCart = (product, quantityToAdd = 1) => {
    const qty = Math.max(1, parseInt(quantityToAdd, 10) || 1);
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => {
        const sameId = String(item.id) === String(product.id);
        const sameVariant = product.variant_id
          ? String(item.variant_id) === String(product.variant_id)
          : !item.variant_id;
        const sameSku = product.sku ? item.sku === product.sku : true;
        return sameId && sameVariant && sameSku;
      });

      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [
        ...prev,
        { ...product, quantity: qty, addedAt: new Date().toISOString() },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, variantId, sku) => {
    setCartItems((prev) =>
      prev.filter((item) => {
        const matchId = String(item.id) === String(productId);
        const matchVariant = variantId
          ? String(item.variant_id) === String(variantId)
          : true;
        const matchSku = sku ? item.sku === sku : true;

        // Keep item if it does NOT match all specified criteria
        return !(matchId && matchVariant && matchSku);
      })
    );
  };

  const updateQuantity = (productId, variantId, quantity, sku) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => {
        const matchId = String(item.id) === String(productId);
        const matchVariant = variantId
          ? String(item.variant_id) === String(variantId)
          : !item.variant_id;
        const matchSku = sku ? item.sku === sku : true;

        return matchId && matchVariant && matchSku
          ? { ...item, quantity }
          : item;
      })
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const priceStr = String(item.price).replace(/[^0-9.]/g, "");
      const price = parseFloat(priceStr) || 0;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
    }),
    [cartItems, isCartOpen, cartTotal, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
