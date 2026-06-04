import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { User, Package, MapPin, LogOut } from "lucide-react";

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="py-6 animate-fade-in min-h-[60vh]">
        <h1 className="font-serif text-[2.5rem] md:text-[3rem] leading-none mb-2">My Account</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-8">Manage your profile & orders</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.05)] h-fit">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f7d7c4] to-accent flex items-center justify-center text-white text-2xl font-serif font-bold">
                {(user.full_name || user.email || "U").charAt(0).toUpperCase()}
              </div>
              <div className="text-center">
                <h2 className="font-serif text-lg font-bold">{user.full_name || "User"}</h2>
                <p className="text-sm text-primary/50">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Link to="/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/50 transition-colors text-sm">
                <Package size={18} className="text-accent" /> My Orders
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-sm text-red-400">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            <h2 className="font-serif text-xl font-bold mb-6">Profile Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-primary/50 mb-2">Full Name</label>
                <div className="px-4 py-3 rounded-xl bg-white/50 border border-primary/5 text-sm">
                  {user.full_name || "—"}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-primary/50 mb-2">Email</label>
                <div className="px-4 py-3 rounded-xl bg-white/50 border border-primary/5 text-sm">
                  {user.email || "—"}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-primary/50 mb-2">Account Status</label>
                <div className="px-4 py-3 rounded-xl bg-white/50 border border-primary/5 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    Active
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-primary/50 mb-2">Roles</label>
                <div className="px-4 py-3 rounded-xl bg-white/50 border border-primary/5 text-sm">
                  {user.roles?.join(", ") || "Customer"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
