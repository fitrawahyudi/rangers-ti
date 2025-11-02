// frontend/src/components/ProtectedRouteVolunteer.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedVolunteerRoutes({ children }) {
  const token = localStorage.getItem("volunteerToken"); // Cek token VOLUNTEER

  if (!token) {
    // Jika tidak ada token, lempar ke halaman login volunteer
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedVolunteerRoutes;
