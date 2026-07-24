import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Footer from "../components/Footer";
import { Leaf, Lock, Mail, User, ArrowRight, Eye, EyeOff } from "lucide-react";

const SignupPage = () => {
  useDocumentTitle("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signup(email, password, fullName);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="py-6 sm:py-10 animate-fade-in min-h-[60vh]">
        {/* Integrated Page Header & Form Container */}
        <div className="max-w-md mx-auto w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm text-[#2d3a30]/70">
              Join the SVARP Body Wellness community for natural living.
            </p>
          </div>

          {/* Integrated Form Block */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1e5e3a]/10 shadow-sm space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1e5e3a]">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="signup-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf9f5] border border-[#1e5e3a]/15 text-[#2d3a30] text-sm placeholder-[#2d3a30]/30 focus:outline-none focus:border-[#1e5e3a] transition-colors"
                    placeholder="John Doe"
                  />
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1e5e3a]/50" />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1e5e3a]">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf9f5] border border-[#1e5e3a]/15 text-[#2d3a30] text-sm placeholder-[#2d3a30]/30 focus:outline-none focus:border-[#1e5e3a] transition-colors"
                    placeholder="you@example.com"
                  />
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1e5e3a]/50" />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1e5e3a]">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#faf9f5] border border-[#1e5e3a]/15 text-[#2d3a30] text-sm placeholder-[#2d3a30]/30 focus:outline-none focus:border-[#1e5e3a] transition-colors"
                    placeholder="••••••••"
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1e5e3a]/50" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e5e3a]/60 hover:text-[#1e5e3a] transition-colors p-1 flex items-center justify-center cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                id="signup-submit"
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#1e5e3a", color: "#ffffff" }}
                className="w-full py-3 px-4 hover:bg-[#15462a] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-sm flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                {loading ? "Creating account..." : "Create Account"}
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="pt-3 border-t border-[#1e5e3a]/10 text-center">
              <p className="text-xs text-[#2d3a30]/70">
                Already have an account?{" "}
                <Link to="/login" className="text-[#1e5e3a] hover:text-accent font-bold underline ml-1">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
