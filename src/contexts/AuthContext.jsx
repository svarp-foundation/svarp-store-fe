import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { api } from "../utils/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    const handleAuthLogout = () => logout();
    window.addEventListener("auth:logout", handleAuthLogout);
    return () => window.removeEventListener("auth:logout", handleAuthLogout);
  }, [logout]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const formatError = (errorData, fallback) => {
    if (!errorData || !errorData.detail) return fallback;
    const detail = errorData.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return detail
        .map((err) => {
          if (err && typeof err === "object") {
            const field = err.loc && Array.isArray(err.loc) ? err.loc[err.loc.length - 1] : "";
            return field ? `${field}: ${err.msg || "Invalid value"}` : (err.msg || JSON.stringify(err));
          }
          return String(err);
        })
        .join("; ");
    }
    if (typeof detail === "object") {
      return detail.msg || JSON.stringify(detail);
    }
    return fallback;
  };

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        if (data.user) {
          setUser(data.user);
        } else {
          await fetchUser();
        }
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: formatError(errorData, "Login failed") };
      }
    } catch (err) {
      console.error("Login request failed:", err);
      return { success: false, error: "Network or server error occurred" };
    }
  }, [fetchUser]);

  const sendOtp = useCallback(async (email, purpose = "login") => {
    try {
      const response = await api.post("/api/auth/otp/send", { email, purpose });
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const errorData = await response.json();
        return { success: false, error: formatError(errorData, "Failed to send OTP code") };
      }
    } catch (err) {
      console.error("OTP send failed:", err);
      return { success: false, error: "Failed to connect to email portal" };
    }
  }, []);

  const verifyOtp = useCallback(async (email, otpCode, purpose = "login") => {
    try {
      const response = await api.post("/api/auth/otp/verify", { email, otp_code: otpCode, purpose });
      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          if (data.user) {
            setUser(data.user);
          } else {
            await fetchUser();
          }
        }
        return { success: true, data };
      } else {
        const errorData = await response.json();
        return { success: false, error: formatError(errorData, "Invalid or expired OTP code") };
      }
    } catch (err) {
      console.error("OTP verify failed:", err);
      return { success: false, error: "Failed to connect to email portal" };
    }
  }, [fetchUser]);

  const signup = useCallback(async (email, password, fullName, otpCode) => {
    try {
      const response = await api.post("/api/auth/signup", { email, password, full_name: fullName, otp_code: otpCode });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        if (data.user) {
          setUser(data.user);
        } else {
          await fetchUser();
        }
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: formatError(errorData, "Signup failed") };
      }
    } catch (err) {
      console.error("Signup request failed:", err);
      return { success: false, error: "Network or server error occurred" };
    }
  }, [fetchUser]);

  const value = useMemo(
    () => ({ user, loading, login, sendOtp, verifyOtp, signup, logout }),
    [user, loading, login, sendOtp, verifyOtp, signup, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
