import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1e5e3a] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    const loginPath = requiredRole === "admin" ? "/admin/login" : "/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (requiredRole) {
    const roles = user.roles || (user.role ? [user.role] : []);
    const isAuthorized = roles.includes(requiredRole) || user.role === requiredRole;
    if (!isAuthorized) {
      const fallbackPath = requiredRole === "admin" ? "/admin/login" : "/";
      return <Navigate to={fallbackPath} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
