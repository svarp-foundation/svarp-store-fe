import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import Footer from "../components/Footer";
import { ChevronLeft, Package } from "lucide-react";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/api/orders/${orderId}`);
        if (res.ok) setOrder(await res.json());
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-2xl mb-4">Order not found</h2>
        <button onClick={() => navigate("/orders")} className="text-accent underline">Back to Orders</button>
      </div>
    );
  }

  return (
    <>
      <div className="py-6 animate-fade-in">
        <button onClick={() => navigate("/orders")} className="flex items-center gap-2 text-sm text-primary/60 hover:text-accent mb-8 transition-colors">
          <ChevronLeft size={16} /> Back to Orders
        </button>

        <h1 className="font-serif text-[2rem] md:text-[2.5rem] leading-none mb-2">
          Order #{order.id?.slice(0, 8)}
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-8">
          Placed {order.created_at ? new Date(order.created_at).toLocaleDateString() : "—"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="font-serif text-lg font-bold mb-4">Items</h2>
            {order.items?.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-primary/5 last:border-0">
                <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center">
                  <Package size={18} className="text-primary/30" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name || `Product #${item.product_id}`}</p>
                  <p className="text-xs text-primary/50">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-sm">&#x20b9;{item.price * item.quantity}</span>
              </div>
            )) || <p className="text-sm text-primary/50">No items data available</p>}
          </div>

          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-fit">
            <h2 className="font-serif text-lg font-bold mb-4">Summary</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between"><span className="text-primary/60">Status</span><span className="font-bold capitalize">{order.status}</span></div>
              <div className="flex justify-between"><span className="text-primary/60">Total</span><span className="font-bold text-accent">&#x20b9;{order.total_amount}</span></div>
              <div className="flex justify-between"><span className="text-primary/60">Currency</span><span>{order.currency || "INR"}</span></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetailPage;
