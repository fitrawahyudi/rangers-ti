// frontend/src/pages/VolunteerStatus.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Buat instance axios terpisah untuk volunteer
const volunteerApi = axios.create({
  baseURL: "http://localhost:5000",
});

// Interceptor untuk token volunteer
volunteerApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("volunteerToken"); // Ambil token volunteer
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function VolunteerStatus() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await volunteerApi.get("/volunteer/me"); // Panggil endpoint /me
        setData(response.data);
      } catch (err) {
        setError(
          "Gagal mengambil data atau sesi berakhir. Silakan login lagi."
        );
        // Handle token expired
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("volunteerToken");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("volunteerToken");
    navigate("/login");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "DITERIMA":
        return "badge bg-success fs-5";
      case "DITOLAK":
        return "badge bg-danger fs-5";
      case "PENDING":
      default:
        return "badge bg-warning text-dark fs-5";
    }
  };

  if (loading) return <div className="text-center p-5">Memuat data...</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Status Pendaftaran Kamu</h4>
              <button onClick={handleLogout} className="btn btn-danger btn-sm">
                Logout
              </button>
            </div>

            {data && (
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">{data.nama_lengkap}</h2>
                  <p className="text-muted mb-0">
                    {data.email} | {data.npm}
                  </p>
                </div>

                <div className="text-center p-4 bg-light rounded mb-4">
                  <h5 className="text-muted mb-2">STATUS PENDAFTARAN:</h5>
                  <span className={getStatusBadge(data.status)}>
                    {data.status}
                  </span>
                </div>

                <h5 className="mt-4">Detail Pendaftaran:</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Pilihan Divisi:</span>
                    <strong>{data.divisi_pilihan}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Alasan Bergabung:</span>
                    <strong>{data.alasan_bergabung}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tanggal Daftar:</span>
                    <strong>
                      {new Date(data.createdAt).toLocaleDateString("id-ID")}
                    </strong>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerStatus;
