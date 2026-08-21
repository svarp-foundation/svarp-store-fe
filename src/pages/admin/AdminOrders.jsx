import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import {
  ShoppingBag,
  Search,
  CheckCircle,
  X,
  AlertCircle,
  Eye,
  Package,
  Clock,
  User,
  CreditCard,
  ArrowRight,
  FileText,
  RefreshCw,
} from "lucide-react";

const STATUS_BADGES = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  created: "bg-amber-50 text-amber-700 border-amber-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Transition Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [targetStatus, setTargetStatus] = useState("processing");
  const [statusNotes, setStatusNotes] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState(null);

  // View Details Modal State
  const [viewingOrder, setViewingOrder] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrderDetails = async (order) => {
    setViewingOrder(order);
    setLoadingDetail(true);
    const orderId = order.id || order.order_id;
    try {
      const res = await api.get(`/api/admin/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setViewingOrder(data);
      }
    } catch (err) {
      console.error("Failed to fetch order details:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setUpdating(true);
    setMessage(null);

    try {
      const orderId = selectedOrder.id || selectedOrder.order_id;
      const res = await api.put(`/api/admin/orders/${orderId}/status`, {
        to_status: targetStatus,
        notes: statusNotes,
      });

      if (res.ok) {
        setMessage({ type: "success", text: `Order status successfully updated to "${targetStatus}"` });
        setSelectedOrder(null);
        if (viewingOrder && (viewingOrder.id === orderId || viewingOrder.order_id === orderId)) {
          fetchOrderDetails(selectedOrder);
        }
        fetchOrders();
      } else {
        const errData = await res.json();
        setMessage({ type: "error", text: errData.detail || "Status transition failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error occurred" });
    } finally {
      setUpdating(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const statusMatch = statusFilter === "all" || (o.status || "").toLowerCase() === statusFilter.toLowerCase();
    const orderId = String(o.id || o.order_id || "").toLowerCase();
    const customer = (o.customer_name || o.user_id || o.customer_email || "").toLowerCase();
    const searchMatch = orderId.includes(search.toLowerCase()) || customer.includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1f3b45] tracking-wide">Order Lifecycle Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor, view details, fulfill, and update order statuses across all customer purchases
          </p>
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl border text-xs font-semibold flex items-center justify-between ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2 flex-1 w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none font-medium"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? "bg-[#1f3b45] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs font-semibold flex items-center justify-center gap-2">
            <RefreshCw size={16} className="animate-spin text-[#1f3b45]" />
            Loading order history...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No orders found matching the criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredOrders.map((o) => {
                  const orderId = o.id || o.order_id;
                  const st = (o.status || "pending").toLowerCase();
                  const itemCount = o.items?.length || o.quantity || 1;
                  const customerName = o.customer_name || (o.user_id ? `User #${String(o.user_id).slice(-8)}` : "Guest");

                  return (
                    <tr key={orderId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#1f3b45]">
                        <button
                          onClick={() => fetchOrderDetails(o)}
                          className="hover:underline text-left cursor-pointer"
                        >
                          #{String(orderId).slice(-8).toUpperCase()}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {o.created_at ? new Date(o.created_at).toLocaleString() : "N/A"}
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-semibold">
                        {customerName}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {itemCount} item(s)
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        ₹{(o.total_amount || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                            STATUS_BADGES[st] || STATUS_BADGES.pending
                          }`}
                        >
                          {st}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => fetchOrderDetails(o)}
                            className="px-3 py-1.5 bg-[#1f3b45]/10 hover:bg-[#1f3b45]/20 text-[#1f3b45] font-bold text-xs rounded-lg border border-[#1f3b45]/20 transition-all flex items-center gap-1.5 cursor-pointer"
                            title="View Order Details"
                          >
                            <Eye size={14} />
                            <span>Details</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedOrder(o);
                              setTargetStatus(st === "pending" ? "processing" : st === "processing" ? "shipped" : "delivered");
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-bold rounded-lg border border-slate-200 transition-all cursor-pointer"
                          >
                            Update Status
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl p-6 relative my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-4 mb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Order #{String(viewingOrder.id || viewingOrder.order_id).slice(-8).toUpperCase()}
                  </h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                      STATUS_BADGES[(viewingOrder.status || "pending").toLowerCase()] || STATUS_BADGES.pending
                    }`}
                  >
                    {viewingOrder.status || "pending"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <Clock size={13} className="text-slate-400" />
                  Placed on {viewingOrder.created_at ? new Date(viewingOrder.created_at).toLocaleString() : "N/A"}
                </p>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {loadingDetail ? (
              <div className="py-12 text-center text-slate-400 text-xs font-semibold flex items-center justify-center gap-2">
                <RefreshCw size={16} className="animate-spin text-brand-primary" />
                Loading detailed order breakdown...
              </div>
            ) : (
              <div className="space-y-6">
                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Customer Info */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <User size={14} className="text-brand-primary" />
                      <span>Customer Details</span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900">
                      {viewingOrder.customer_name || "N/A"}
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      User ID: {viewingOrder.user_id || "Guest"}
                    </p>
                  </div>

                  {/* Payment & Summary */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <CreditCard size={14} className="text-emerald-600" />
                      <span>Financial Summary</span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900">
                      Total: ₹{(viewingOrder.total_amount || 0).toLocaleString("en-IN")} {viewingOrder.currency || "INR"}
                    </p>
                    <p className="text-xs text-slate-500">
                      Application ID: <span className="font-mono text-slate-700">{viewingOrder.application_id || "svarp-store"}</span>
                    </p>
                  </div>
                </div>

                {/* Purchased Items List */}
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Package size={14} className="text-slate-600" />
                    Items Purchased ({viewingOrder.items?.length || 1})
                  </h3>
                  <div className="bg-slate-50/50 rounded-2xl border border-slate-200/80 overflow-hidden">
                    {viewingOrder.items && viewingOrder.items.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {viewingOrder.items.map((item, idx) => (
                          <div key={idx} className="p-3.5 flex items-center justify-between gap-4 hover:bg-white transition-colors">
                            <div className="flex items-center gap-3">
                              {item.image && !imageErrors[idx] ? (
                                <img
                                  src={item.image}
                                  alt={item.product_name || item.name}
                                  className="w-11 h-11 object-cover rounded-xl border border-slate-200"
                                  onError={() => setImageErrors((prev) => ({ ...prev, [idx]: true }))}
                                />
                              ) : (
                                <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200/80">
                                  <Package size={20} />
                                </div>
                              )}
                              <div>
                                <p className="text-xs font-extrabold text-slate-900">
                                  {item.product_name || item.name || "Product"}
                                </p>
                                {item.variant_name && (
                                  <p className="text-[11px] text-slate-500 font-medium">
                                    Variant: {item.variant_name}
                                  </p>
                                )}
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                  ID: {item.product_id || "N/A"} {item.sku ? `• SKU: ${item.sku}` : ""}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-bold text-slate-900">
                                ₹{((item.unit_price || item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                              </p>
                              <p className="text-[11px] text-slate-500 font-medium">
                                ₹{item.unit_price || item.price || 0} × {item.quantity || 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-slate-600 text-xs font-medium flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{viewingOrder.product_name || "Main Item"}</p>
                          <p className="text-slate-500 text-[11px]">Quantity: {viewingOrder.quantity || 1}</p>
                        </div>
                        <p className="font-bold text-slate-900">₹{(viewingOrder.total_amount || 0).toLocaleString("en-IN")}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Transition History */}
                {viewingOrder.history && viewingOrder.history.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <FileText size={14} className="text-slate-600" />
                      Status History & Audit Trail
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                      {viewingOrder.history.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs border-l-2 border-brand-primary pl-3 py-0.5">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800 capitalize">{h.from_status || h.from_state || "initial"}</span>
                              <ArrowRight size={12} className="text-slate-400" />
                              <span className="font-bold text-brand-primary capitalize">{h.to_status || h.to_state}</span>
                              {h.changed_by && (
                                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                                  {h.changed_by}
                                </span>
                              )}
                            </div>
                            {h.notes && (
                              <p className="text-[11px] text-slate-600 mt-1 italic">
                                "{h.notes}"
                              </p>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                            {h.changed_at ? new Date(h.changed_at).toLocaleString() : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => {
                      setSelectedOrder(viewingOrder);
                      const st = (viewingOrder.status || "pending").toLowerCase();
                      setTargetStatus(st === "pending" ? "processing" : st === "processing" ? "shipped" : "delivered");
                    }}
                    className="px-4 py-2 bg-[#1f3b45] text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:bg-[#162a31] cursor-pointer"
                  >
                    Update Order Status
                  </button>

                  <button
                    onClick={() => setViewingOrder(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Update Order Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl p-6 relative">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Transition Order Status</h2>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Order #{String(selectedOrder.id || selectedOrder.order_id).slice(-8).toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Select New Order Status
                </label>
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#1f3b45] font-bold"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered / Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Status Notes / Tracking Details
                </label>
                <textarea
                  rows="3"
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="e.g. Shipped via BlueDart tracking #123456"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#1f3b45] font-medium"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2.5 bg-[#1f3b45] hover:bg-[#162a31] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  {updating ? "Saving..." : "Confirm Transition"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
