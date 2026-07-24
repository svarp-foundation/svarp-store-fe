import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IndianRupee,
  ShoppingBag,
  Package,
  Users,
  ArrowRight,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const StatCard = ({ label, value, sub, icon: Icon, color = "emerald" }) => {
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1.5">{value}</h3>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">{sub}</p>
        </div>
        <div className={`p-3 rounded-xl border ${colorMap[color] || colorMap.emerald}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch admin stats:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-2">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-wide">Store Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Key metrics, revenue summary, and store inventory status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Live
          </span>
        </div>
      </div>

      {/* ── KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white h-28 rounded-2xl border border-slate-200 animate-pulse"
            />
          ))
        ) : (
          <>
            <StatCard
              label="Total Store Revenue"
              value={`₹${(stats?.total_revenue ?? 0).toLocaleString("en-IN")}`}
              sub="From processed sales"
              icon={IndianRupee}
              color="emerald"
            />
            <StatCard
              label="Total Orders"
              value={stats?.total_orders ?? 0}
              sub="Lifetime store orders"
              icon={ShoppingBag}
              color="amber"
            />
            <StatCard
              label="Total Products"
              value={stats?.total_products ?? 0}
              sub="Active items in inventory"
              icon={Package}
              color="blue"
            />
            <StatCard
              label="Registered Customers"
              value={stats?.total_users ?? 0}
              sub="Central portal accounts"
              icon={Users}
              color="purple"
            />
          </>
        )}
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/products"
          className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-primary/50 transition-all flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-brand-primary group-hover:bg-emerald-100 transition-all">
              <Package size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                Manage Products
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Add items, update stock & price</p>
            </div>
          </div>
          <ArrowRight
            size={18}
            className="text-slate-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all"
          />
        </Link>

        <Link
          to="/admin/orders"
          className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-amber-500/50 transition-all flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 group-hover:bg-amber-100 transition-all">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                Manage Orders
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Track fulfillment & status</p>
            </div>
          </div>
          <ArrowRight
            size={18}
            className="text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all"
          />
        </Link>

        <Link
          to="/admin/users"
          className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-purple-500/50 transition-all flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-purple-700 group-hover:bg-purple-100 transition-all">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                View Customers
              </p>
              <p className="text-xs text-slate-500 mt-0.5">User directory & accounts</p>
            </div>
          </div>
          <ArrowRight
            size={18}
            className="text-slate-400 group-hover:text-purple-700 group-hover:translate-x-1 transition-all"
          />
        </Link>
      </div>

      {/* ── Recent Activity & Alerts Feed ── */}
      {!loading && stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders Overview */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag size={16} className="text-amber-600" />
                Recent Orders
              </h3>
              <Link
                to="/admin/orders"
                className="text-xs text-brand-primary font-bold hover:underline flex items-center gap-1"
              >
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="flex-1 space-y-3">
              {!stats.recent_orders || stats.recent_orders.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 italic">
                  No recent orders found
                </div>
              ) : (
                stats.recent_orders.map((o) => (
                  <div
                    key={o.id || o.order_id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100/70 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Order #{String(o.id || o.order_id).slice(-8).toUpperCase()}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {o.created_at ? new Date(o.created_at).toLocaleDateString() : "Recent"} • {o.items?.length || 1} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-brand-primary">
                        ₹{(o.total_amount || 0).toLocaleString("en-IN")}
                      </p>
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 mt-0.5">
                        {o.status || "Pending"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-600" />
                Inventory Stock Warnings
              </h3>
              <Link
                to="/admin/products"
                className="text-xs text-brand-primary font-bold hover:underline flex items-center gap-1"
              >
                Inventory <ChevronRight size={14} />
              </Link>
            </div>
            <div className="flex-1 space-y-3">
              {!stats.low_stock_products || stats.low_stock_products.length === 0 ? (
                <div className="p-6 text-center text-xs text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-100 font-medium">
                  ✓ All products have adequate inventory stock.
                </div>
              ) : (
                stats.low_stock_products.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">{p.name || p.title}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">SKU: {p.sku || "N/A"}</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200">
                      {p.stock} remaining
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
