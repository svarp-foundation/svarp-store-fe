import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Footer from "../components/Footer";
import { Leaf, Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, KeyRound, CheckCircle2 } from "lucide-react";

const LoginPage = () => {
  useDocumentTitle("Login");
  const [authMode, setAuthMode] = useState("password"); // "password" | "otp"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, sendOtp, verifyOtp } = useAuth();

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setLoading(true);
    setOtpMessage("");

    const result = await sendOtp(email.trim(), "login");
    if (result.success) {
      setOtpSent(true);
      setOtpMessage(`OTP verification code dispatched to ${email}`);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    setError(null);
    setLoading(true);

    const result = await verifyOtp(email.trim(), otpCode.trim(), "login");
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
        {/* Page Header */}
        <div className="max-w-md mx-auto w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              Sign In to Your Account
            </h1>
            <p className="text-xs sm:text-sm text-[#2d3a30]/70">
              Access your orders, saved items, and personal wellness profile.
            </p>
          </div>

          {/* Login Mode Switcher */}
          <div className="flex p-1 bg-gray-100 rounded-2xl border border-gray-200/80">
            <button
              type="button"
              onClick={() => {
                setAuthMode("password");
                setError(null);
                setOtpMessage("");
              }}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                authMode === "password"
                  ? "bg-white text-[#1e5e3a] shadow-sm font-extrabold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("otp");
                setError(null);
                setOtpMessage("");
              }}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                authMode === "otp"
                  ? "bg-[#1e5e3a] text-white shadow-sm font-extrabold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OTP Email Login</span>
            </button>
          </div>

          {/* Integrated Form Block */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1e5e3a]/10 shadow-sm space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
                {error}
              </div>
            )}

            {otpMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{otpMessage}</span>
              </div>
            )}

            {authMode === "password" ? (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1e5e3a]">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="login-email"
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
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      required
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
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  id="login-submit"
                  type="submit"
                  disabled={loading}
                  style={{ backgroundColor: "#1e5e3a", color: "#ffffff" }}
                  className="w-full py-3 px-4 hover:bg-[#15462a] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-sm flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              /* OTP Login Flow */
              <div className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-1.5 text-left">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1e5e3a]">
                        Enter Your Email for OTP
                      </label>
                      <div className="relative">
                        <input
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

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ backgroundColor: "#1e5e3a", color: "#ffffff" }}
                      className="w-full py-3 px-4 hover:bg-[#15462a] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                      {loading ? "Dispatching OTP..." : "Send OTP Code"}
                      <ShieldCheck size={14} />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-1.5 text-left">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1e5e3a]">
                        Enter 6-Digit OTP Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-full text-center tracking-[8px] py-3 rounded-xl bg-[#faf9f5] border border-[#1e5e3a]/30 font-mono text-lg font-bold text-[#1e5e3a] focus:outline-none focus:border-[#1e5e3a]"
                          placeholder="482917"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ backgroundColor: "#1e5e3a", color: "#ffffff" }}
                      className="w-full py-3 px-4 hover:bg-[#15462a] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                      {loading ? "Verifying..." : "Verify & Sign In"}
                      <KeyRound size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="w-full text-xs text-gray-500 hover:text-gray-800 font-semibold text-center underline"
                    >
                      Resend Code / Change Email
                    </button>
                  </form>
                )}
              </div>
            )}

            <div className="pt-3 border-t border-[#1e5e3a]/10 text-center">
              <p className="text-xs text-[#2d3a30]/70">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-[#1e5e3a] hover:text-accent font-bold underline ml-1">
                  Create an Account
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

export default LoginPage;
