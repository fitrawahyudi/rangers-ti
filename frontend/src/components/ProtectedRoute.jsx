// frontend/src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    // Jika tidak ada token, lempar ke halaman login
    return <Navigate to="/admin/login" replace />;
  }

  // Jika ada token, tampilkan halaman (misal: AdminDashboard)
  return children;
}

export default ProtectedRoute;
