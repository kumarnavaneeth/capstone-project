import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !roles.includes(requiredRole)) {
    return roles.includes("ADMIN") 
      ? <Navigate to="/admin/dashboard" replace /> 
      : <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
