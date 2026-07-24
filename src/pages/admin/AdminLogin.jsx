import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const roles = user.roles || (user.role ? [user.role] : []);
      if (roles.includes("admin") || user.role === "admin") {
        navigate("/admin");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
          try {
            const payload = JSON.parse(atob(savedToken.split(".")[1]));
            const roles = payload.roles || (payload.role ? [payload.role] : []);
            if (!roles.includes("admin") && payload.role !== "admin") {
              setError("Access denied: You are not authorized as an admin.");
              setLoading(false);
              return;
            }
          } catch (e) {}
        }
        navigate("/admin");
      } else {
        setError(res.error || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center font-sans p-4 relative overflow-hidden text-slate-800">
      {/* Background ambient light effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/10 rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[2rem] overflow-hidden z-10 p-8 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-brand-primary mb-4 shadow-sm">
            <ShieldCheck size={28} />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-extrabold tracking-wide text-brand-primary brand">
              SVARP STORE
            </span>
            <span className="text-[10px] font-bold text-brand-accent tracking-[0.2em] uppercase mt-1">
              Admin Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Sign in to manage store catalog, orders & inventory
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-xs mb-6 flex items-start gap-2.5">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
              Admin Email
            </label>
            <input
              type="email"
              placeholder="admin@svarp.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-slate-800 placeholder-slate-400 font-medium transition-all text-sm shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-slate-800 placeholder-slate-400 font-medium transition-all text-sm shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-3.5 rounded-2xl font-bold transition-all shadow-md text-center text-sm disabled:opacity-50 active:scale-[0.99] mt-3 cursor-pointer"
          >
            {loading ? "Signing in..." : "Login to Store Admin"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            Centralized Auth • SVARP Store Management
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
