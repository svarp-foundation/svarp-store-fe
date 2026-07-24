import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  Menu,
  X,
  Store,
  ShieldCheck,
} from "lucide-react";

const AdminLayout = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/admin/login");
        return;
      }
      const roles = user.roles || (user.role ? [user.role] : []);
      if (!roles.includes("admin") && user.role !== "admin") {
        navigate("/admin/login");
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center text-slate-600 font-sans">
        <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mb-3"></div>
        <p className="text-xs font-semibold tracking-wider text-slate-500">Loading Admin Dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={18} />,
      end: true,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package size={18} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingBag size={18} />,
    },
    {
      name: "Customers",
      path: "/admin/users",
      icon: <Users size={18} />,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100/70 font-sans text-slate-900 w-full relative">
      {/* Mobile Header Bar */}
      <div className="md:hidden w-full bg-brand-primary text-white px-4 py-3 flex justify-between items-center fixed top-0 left-0 z-50 border-b border-white/10 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
            <Store size={18} />
          </div>
          <div>
            <span className="text-xs font-black tracking-wider text-white brand block">
              SVARP STORE
            </span>
            <span className="text-[9px] font-bold text-amber-300 tracking-widest uppercase">
              Admin Portal
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-white bg-white/10 rounded-xl hover:bg-white/20 transition-all"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-brand-primary text-white fixed h-screen border-r border-emerald-900/30 flex flex-col z-50 transition-transform duration-300 shadow-xl
          max-md:top-0 max-md:left-0
          ${isSidebarOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full md:translate-x-0"}`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-wide text-white brand">
              SVARP STORE
            </h2>
            <p className="text-[10px] font-bold text-amber-300 tracking-widest uppercase mt-0.5">
              Admin Portal
            </p>
          </div>
        </div>

        {/* User Info Badge */}
        <div className="mx-3 mt-4 mb-2 p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white text-brand-primary font-bold text-xs flex items-center justify-center shadow-sm">
            {(user.full_name || user.email || "A")[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">
              {user.full_name || "Admin User"}
            </p>
            <p className="text-[10px] text-emerald-100/75 truncate">{user.email}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-white text-brand-primary shadow-sm"
                    : "text-emerald-100/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Storefront Link & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10"
          >
            <Store size={15} />
            View Storefront
          </a>
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-100 border border-red-500/30 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 md:ml-64 p-6 max-w-7xl max-md:p-4 max-md:pt-20 w-full text-slate-900">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
