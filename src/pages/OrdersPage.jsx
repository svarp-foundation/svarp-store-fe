import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../utils/api";
import Footer from "../components/Footer";
import { Package, ChevronRight, Clock } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const OrdersPage = () => {
  useDocumentTitle("My Orders");
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (user) {
      fetchOrders();
    }
  }, [user, authLoading, navigate]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/orders/");
      if (res.ok) {
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      processing: "bg-indigo-100 text-indigo-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="py-6 animate-fade-in min-h-[60vh]">
        <h1 className="font-serif text-[2.5rem] md:text-[3rem] leading-none mb-2">My Orders</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-8">
          {orders.length} {orders.length === 1 ? "order" : "orders"} placed
        </p>

        {orders.length === 0 ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center border-2 border-dashed border-primary/5 rounded-3xl">
            <Package size={48} className="text-primary/10 mb-4" />
            <h2 className="font-serif text-xl mb-2">No orders yet</h2>
            <p className="text-sm text-primary/40 mb-6">Your order history will appear here.</p>
            <Link to="/shop" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:-translate-y-1 transition-custom">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/order/${order.id}`}
                className="bg-white/40 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-custom flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Package size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Order #{order.id?.slice(0, 8)}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={12} className="text-primary/40" />
                      <span className="text-xs text-primary/50">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : "—"}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusColor(order.status)}`}>
                        {order.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-accent">&#x20b9;{order.total_amount || "—"}</span>
                  <ChevronRight size={16} className="text-primary/30" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
