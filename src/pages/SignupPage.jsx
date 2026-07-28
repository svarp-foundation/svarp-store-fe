import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Footer from "../components/Footer";
import {
  Leaf,
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const SignupPage = () => {
  useDocumentTitle("Sign Up");
  const [step, setStep] = useState(1); // 1: Info Form, 2: OTP Verification
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");

  // OTP State
  const [otpCode, setOtpCode] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sendOtp, signup } = useAuth();

  // Step 1: Send OTP for Email Verification
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(null);
    setLoading(true);
    setOtpMessage("");

    const result = await sendOtp(email.trim(), "signup");
    if (result.success) {
      setStep(2);
      setOtpMessage(`A 6-digit verification code was sent to ${email.trim()}`);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // Step 2: Complete Registration with OTP Code
  const handleCompleteSignup = async (e) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setError(null);
    setLoading(true);

    const result = await signup(email.trim(), password, fullName.trim(), otpCode.trim());
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // Resend OTP Code
  const handleResendOtp = async () => {
    setError(null);
    setLoading(true);
    setOtpMessage("");

    const result = await sendOtp(email.trim(), "signup");
    if (result.success) {
      setOtpMessage(`A new verification code was dispatched to ${email.trim()}`);
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

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-3 text-xs font-bold uppercase tracking-wider">
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full ${
                step === 1
                  ? "bg-[#1e5e3a] text-white"
                  : "bg-emerald-100 text-[#1e5e3a]"
              }`}
            >
              <span>1. Account Info</span>
            </div>
            <span className="text-gray-300">•</span>
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full ${
                step === 2
                  ? "bg-[#1e5e3a] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>2. OTP Verification</span>
            </div>
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

            {step === 1 ? (
              /* Step 1: User details & Send OTP */
              <form onSubmit={handleRequestOtp} className="space-y-4">
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
                  {loading ? "Sending OTP Code..." : "Send Verification Code"}
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              /* Step 2: Enter OTP Code & Submit */
              <form onSubmit={handleCompleteSignup} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1e5e3a]">
                    Enter 6-Digit OTP Code
                  </label>
                  <div className="relative">
                    <input
                      id="signup-otp"
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
                  id="signup-verify-submit"
                  type="submit"
                  disabled={loading}
                  style={{ backgroundColor: "#1e5e3a", color: "#ffffff" }}
                  className="w-full py-3 px-4 hover:bg-[#15462a] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  {loading ? "Verifying & Creating..." : "Verify & Create Account"}
                  <KeyRound size={14} />
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError(null);
                      setOtpCode("");
                    }}
                    className="text-gray-500 hover:text-gray-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={12} /> Edit Info
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-[#1e5e3a] hover:underline font-bold cursor-pointer disabled:opacity-50"
                  >
                    Resend Code
                  </button>
                </div>
              </form>
            )}

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
