import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const SignupPage = () => {
  useDocumentTitle("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4 sm:px-6">
      <div className="w-full max-w-md animate-fade-in bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-sm">
        <div className="flex justify-center mb-4">
          <img 
            src="https://svarp.org/company/svarp-logo.webp" 
            alt="SVARP Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-2 text-center text-primary">Create Account</h2>
        <p className="text-sm text-center mb-8 text-primary/70">
          Join the SVARP Body Wellness experience
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="text-left">
            <label className="block text-sm font-medium text-primary/80 mb-2 pl-1">Full Name</label>
            <input
              id="signup-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-primary-10 text-primary placeholder-primary/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-primary/80 mb-2 pl-1">Email Address</label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-primary-10 text-primary placeholder-primary/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-primary/80 mb-2 pl-1">Password</label>
            <input
              id="signup-password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-primary-10 text-primary placeholder-primary/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            id="signup-submit"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-brand-primary bg-brand-primary-hover text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-sm"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-primary/60">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline ml-1 font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
