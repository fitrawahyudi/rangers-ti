import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "sweetalert2/dist/sweetalert2.min.css";

// Import halaman-halamanmu
import PublicForm from "./pages/PublicForm";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerLogin from "./pages/VolunteerLogin"; // BARU
import VolunteerStatus from "./pages/VolunteerStatus"; // BARU
import VolunteerForm from "./VolunteerForm.jsx";

// Import Proteksi
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Ganti nama
import ProtectedVolunteerRoutes from "./components/ProtectedVolunteerRoutes.jsx"; // BARU

// Halaman Not Found
import NotFoundPage from "./pages/NotFoundPages.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/daftar-batch-4",
    element: <PublicForm />,
  },
  {
    path: "/login", // Halaman login untuk VOLUNTEER
    element: <VolunteerLogin />,
  },
  {
    path: "/status", // Halaman status VOLUNTEER (protected)
    element: (
      <ProtectedVolunteerRoutes>
        <VolunteerStatus />
      </ProtectedVolunteerRoutes>
    ),
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard", // Halaman dashboard ADMIN (protected)
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*", // <-- Tanda bintang (wildcard)
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
