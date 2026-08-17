import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../utils/api";
import { loadRazorpayScript } from "../utils/razorpay";
import Footer from "../components/Footer";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const CartPage = () => {
  useDocumentTitle("Shopping Cart");
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState({
    full_name: "",
    phone_number: "",
    address_line: "",
    city: "",
    state: "",
    postal_code: "",
  });

  // Coupon promo code states
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    setCouponError("");
    setCouponSuccess("");
    try {
      const res = await api.post("/api/coupons/validate", {
        code: couponCode,
        subtotal: cartTotal,
        items: cartItems.map(item => {
          const priceStr = String(item.price).replace(/[^0-9.]/g, "");
          const price = parseFloat(priceStr) || 0;
          return {
            id: String(item.id),
            price: price,
            quantity: item.quantity
          };
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.valid) {
          setAppliedCoupon({
            id: data.coupon_id,
            code: couponCode.toUpperCase(),
            discount_amount: data.discount_amount
          });
          setCouponSuccess(`Coupon '${couponCode.toUpperCase()}' applied successfully!`);
        } else {
          setCouponError(data.message || "Invalid coupon code");
        }
      } else {
        const data = await res.json();
        setCouponError(data.detail || "Invalid coupon code");
      }
    } catch (err) {
      setCouponError("Failed to validate coupon");
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponSuccess("");
    setCouponError("");
  };

  useEffect(() => {
    if (user) {
      fetchAddress();
    }
  }, [user]);

  const fetchAddress = async () => {
    try {
      const res = await api.get("/api/auth/me/address");
      if (res.ok) {
        const data = await res.json();
        if (data && data.full_name) {
          setAddress({
            full_name: data.full_name || "",
            phone_number: data.phone_number || "",
            address_line: data.address_line || "",
            city: data.city || "",
            state: data.state || "",
            postal_code: data.postal_code || "",
          });
        } else {
          setAddress((prev) => ({ ...prev, full_name: user.full_name || "" }));
        }
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  const showAlert = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError((current) => (current === msg ? null : current));
    }, 5000);
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!address.full_name || !address.phone_number || !address.address_line || !address.city || !address.state || !address.postal_code) {
      showAlert("Please fill in all shipping address fields before checking out.");
      return;
    }

    setCheckoutLoading(true);
    try {
      // Calculate discounted totals
      const discount = appliedCoupon?.discount_amount || 0;
      const discountedTotal = Math.max(0, cartTotal - discount);
      const shippingCost = cartTotal >= 999 ? 0 : 99;
      const finalTotal = discountedTotal + shippingCost;
      const amountInPaise = Math.round(finalTotal * 100);

      // Create payment order via BFF
      const res = await api.post("/api/payments/create-order", {
        amount: amountInPaise,
        currency: "INR",
        metadata: {
          items: cartItems.map((i) => ({ id: i.id, name: i.name, qty: i.quantity })),
          coupon_code: appliedCoupon?.code || null,
        },
      });

      if (!res.ok) throw new Error("Failed to create payment order");

      const paymentData = await res.json();

      // Load Razorpay
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Failed to load Razorpay");

      const options = {
        key: paymentData.key_id,
        amount: amountInPaise,
        currency: "INR",
        name: "SVARP Body Wellness",
        description: `Order of ${cartCount} items`,
        order_id: paymentData.razorpay_order_id,
        handler: async function (response) {
          // Verify payment
          const verifyRes = await api.post("/api/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.ok) {
            // Save address in User Portal DB for auto-filling next time
            await api.post("/api/auth/me/address", {
              full_name: address.full_name,
              phone_number: address.phone_number,
              address_line: address.address_line,
              city: address.city,
              state: address.state,
              postal_code: address.postal_code,
            });

            // Create order in OMS
            const orderRes = await api.post("/api/orders/", {
              items: cartItems.map((item) => {
                const priceStr = String(item.price).replace(/[^0-9.]/g, "");
                const price = parseFloat(priceStr) || 0;
                return {
                  product_id: parseInt(item.id) || 0,
                  variant_id: item.variant_id ? parseInt(item.variant_id) || null : null,
                  name: item.name,
                  quantity: item.quantity,
                  price: price,
                  image: item.image || null,
                };
              }),
              total_amount: finalTotal,
              currency: "INR",
              payment_id: response.razorpay_payment_id,
              payment_order_id: response.razorpay_order_id,
              coupon_code: appliedCoupon?.code || null,
              coupon_id: appliedCoupon?.id || null,
              shipping_address: {
                name: address.full_name,
                phone: address.phone_number,
                address: address.address_line,
                city: address.city,
                state: address.state,
                postal_code: address.postal_code,
              }
            });

            if (orderRes.ok) {
              clearCart();
              navigate("/orders");
            } else {
              console.error("Failed to create order in OMS");
              showAlert("Payment verified, but failed to record the order in our system. Please contact support.");
            }
          }
        },
        prefill: {
          name: address.full_name || user.full_name || "",
          email: user.email || "",
          contact: address.phone_number || "",
        },
        theme: { color: "#1e5e3a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err);
      showAlert("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
          <ShoppingBag size={64} className="text-primary/10 mb-6" />
          <h1 className="font-serif text-2xl md:text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-primary/50 mb-8">Discover our premium organic products and add them to your cart.</p>
          <Link
            to="/shop"
            className="bg-[#1e5e3a] hover:bg-[#15462a] text-white px-8 py-3 rounded-full font-medium hover:-translate-y-1 transition-custom"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="py-6 animate-fade-in">
        <h1 className="font-serif text-[2.5rem] md:text-[3rem] leading-none mb-2">Shopping Cart</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-8">{cartCount} items in your cart</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => {
              const priceStr = String(item.price).replace(/[^0-9.]/g, "");
              const price = parseFloat(priceStr) || 0;

              return (
                <div key={`${item.id}-${item.variant_id}`} className="bg-white/40 backdrop-blur-md rounded-2xl p-4 md:p-6 flex gap-4 md:gap-6 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/50 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={item.image || "/images/placeholder.webp"} alt={item.name} className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif font-bold capitalize">{item.name}</h3>
                      {item.variant_name && <p className="text-xs text-primary/50">{item.variant_name}</p>}
                      <p className="text-accent font-medium mt-1">&#x20b9;{price}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.variant_id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5">
                          <Minus size={14} />
                        </button>
                        <span className="font-bold min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.variant_id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5">
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-primary min-w-[60px] text-right">&#x20b9;{(price * item.quantity).toFixed(0)}</span>
                      <button onClick={() => removeFromCart(item.id, item.variant_id)} className="text-red-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Shipping Address Section */}
            {user && (
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.05)] mt-4">
                <h2 className="font-serif text-xl font-bold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-primary/60">Full Name</label>
                    <input
                      type="text"
                      className="bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5e3a]"
                      placeholder="John Doe"
                      value={address.full_name}
                      onChange={(e) => setAddress({ ...address, full_name: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-primary/60">Phone Number</label>
                    <input
                      type="text"
                      className="bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5e3a]"
                      placeholder="9876543210"
                      value={address.phone_number}
                      onChange={(e) => setAddress({ ...address, phone_number: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-xs font-semibold text-primary/60">Address Line</label>
                    <input
                      type="text"
                      className="bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5e3a]"
                      placeholder="123 Green Street, Flat 4B"
                      value={address.address_line}
                      onChange={(e) => setAddress({ ...address, address_line: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-primary/60">City</label>
                    <input
                      type="text"
                      className="bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5e3a]"
                      placeholder="Bangalore"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-primary/60">State</label>
                    <input
                      type="text"
                      className="bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5e3a]"
                      placeholder="Karnataka"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-primary/60">Postal Code</label>
                    <input
                      type="text"
                      className="bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e5e3a]"
                      placeholder="560001"
                      value={address.postal_code}
                      onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.05)] h-fit sticky top-4">
            <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between"><span className="text-primary/60">Subtotal</span><span className="font-bold">&#x20b9;{cartTotal.toFixed(0)}</span></div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-&#x20b9;{appliedCoupon.discount_amount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between"><span className="text-primary/60">Shipping</span><span className="text-green-600 font-medium">{cartTotal >= 999 ? "Free" : "₹99"}</span></div>
              
              {/* Promo Code input */}
              {user && (
                <div className="border-t border-primary/5 pt-4 mt-1 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                      className="bg-white/60 border border-primary/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1e5e3a] uppercase flex-1"
                    />
                    {appliedCoupon ? (
                      <button
                        onClick={handleRemoveCoupon}
                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={handleApplyCoupon}
                        disabled={applyingCoupon || !couponCode.trim()}
                        className="bg-[#1e5e3a] hover:bg-[#15462a] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {applyingCoupon ? "..." : "Apply"}
                      </button>
                    )}
                  </div>
                  {couponError && <p className="text-[10px] text-red-500 font-bold">{couponError}</p>}
                  {couponSuccess && <p className="text-[10px] text-green-600 font-bold">{couponSuccess}</p>}
                </div>
              )}

              <div className="border-t border-primary/5 pt-3 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-accent">
                  &#x20b9;{(Math.max(0, cartTotal - (appliedCoupon?.discount_amount || 0)) + (cartTotal >= 999 ? 0 : 99)).toFixed(0)}
                </span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full bg-[#1e5e3a] hover:bg-[#15462a] text-white py-4 rounded-full font-medium mt-6 flex items-center justify-center gap-2 hover:-translate-y-1 transition-custom disabled:opacity-50"
              style={{ backgroundColor: "#1e5e3a", color: "#ffffff" }}
            >
              {checkoutLoading ? "Processing..." : <>{user ? "Proceed to Checkout" : "Login to Checkout"} <ArrowRight size={16} /></>}
            </button>
            <Link to="/shop" className="block text-center text-xs uppercase tracking-widest text-primary/40 mt-4 hover:text-accent transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />

      {/* Custom Glassmorphic System Notification */}
      {error && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-white/70 backdrop-blur-md border border-white/30 text-primary px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-3 max-w-sm">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-500 font-bold text-sm">
              !
            </div>
            <div>
              <p className="text-[10px] font-semibold text-primary/50 uppercase tracking-wider">System Alert</p>
              <p className="text-sm font-medium mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-primary/40 hover:text-primary transition-colors text-xs font-bold pl-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
