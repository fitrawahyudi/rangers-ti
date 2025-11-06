import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard-volunteer.css";
import { useNavigate } from "react-router-dom";

// Buat instance axios untuk volunteer
const volunteerApi = axios.create({
  baseURL: "https://backend-rangers-ti.up.railway.app",
});

// Interceptor token
volunteerApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("volunteerToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Fungsi fetcher untuk SWR
const fetcher = (url) => volunteerApi.get(url).then((res) => res.data);

export default function VolunteerStatus() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [systemDark, setSystemDark] = useState(false);

  // Ambil data dengan useSWR (refresh otomatis tiap 10 detik)
  const { data, error, isLoading, mutate } = useSWR("/volunteer/me", fetcher, {
    refreshInterval: 10000, // update tiap 10 detik
    revalidateOnFocus: true, // refresh lagi saat user balik ke tab
  });

  // Kalau error karena token invalid → logout otomatis
  useEffect(() => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      localStorage.removeItem("volunteerToken");
      navigate("/login");
    }
  }, [error, navigate]);

  // Deteksi dark mode sistem
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(prefersDark.matches);
    setDarkMode(prefersDark.matches);

    const handleThemeChange = (e) => setSystemDark(e.matches);
    prefersDark.addEventListener("change", handleThemeChange);

    return () => prefersDark.removeEventListener("change", handleThemeChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("volunteerToken");
    navigate("/login");
  };

  const activeDark = darkMode ?? systemDark;
  const themeClass = activeDark
    ? "bg-dark-custom text-light"
    : "bg-light text-dark";
  const cardClass = activeDark
    ? "bg-dark-card text-light border-0"
    : "bg-white text-dark";

  const getStatusColor = (status) => {
    if (status === "DITERIMA") return "success";
    if (status === "DITOLAK") return "danger";
    if (status === "PENDING") return "warning";
    return "secondary";
  };

  const getStatusText = (status) => {
    if (status === "PENDING")
      return "Data anda sedang kami verifikasi. harap tunggu informasi selanjutnya";
    if (status === "DITERIMA")
      return "Selamat! Kamu diterima sebagai volunteer Rangers TI Batch 4 🎉";
    if (status === "DITOLAK") return "Mohon maaf, kamu belum lolos 😔";
    return "";
  };

  if (isLoading) return <div className="text-center p-5">Memuat data...</div>;
  if (error)
    return (
      <div className="alert alert-danger text-center">
        Gagal mengambil data 😢
      </div>
    );
  if (!data) return <div className="text-center p-5">Data tidak ditemukan</div>;

  const statusColor = getStatusColor(data.status);

  return (
    <div
      className={`min-vh-100 d-flex justify-content-center align-items-center ${themeClass}`}
      style={{
        background: activeDark
          ? "linear-gradient(135deg, #0a192f, #112240)"
          : "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        transition: "all 0.5s ease",
      }}
    >
      <div
        className={`card shadow-lg rounded-4 animate__animated animate__fadeInUp ${cardClass}`}
        style={{ maxWidth: "700px", width: "100%" }}
      >
        {/* HEADER */}
        <div
          className={`card-header d-flex justify-content-between align-items-center rounded-top-4 ${
            activeDark
              ? "bg-primary-subtle text-light"
              : "bg-primary text-white"
          }`}
        >
          <h5 className="mb-0 fw-semibold">Status Pendaftaran Kamu</h5>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setDarkMode(!activeDark)}
              title="Ganti Tema"
            >
              <i
                className={`bi ${activeDark ? "bi-sun-fill" : "bi-moon-fill"}`}
              ></i>
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-danger d-flex align-items-center gap-1"
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="card-body text-center p-5">
          <h2 className="fw-bold mb-1 animate__animated animate__fadeInDown">
            {data.nama}
          </h2>
          <p className="text-warning mb-4 animate__animated animate__fadeInDown animate__delay-1s">
            {data.email} | {data.npm}
          </p>

          {/* STATUS */}
          <div
            className={`rounded-4 py-4 mb-5 border animate__animated animate__fadeInUp animate__delay-1s ${
              activeDark ? "bg-dark-subtle" : "bg-light"
            }`}
          >
            <p className="fw-semibold mb-2">STATUS PENDAFTARAN:</p>
            <span
              className={`badge bg-${statusColor} fs-6 px-4 py-2 ${
                data.status === "PENDING" ? "pending-glow" : ""
              }`}
            >
              {data.status}
            </span>
            <p className="mt-3 text-muted small">
              {getStatusText(data.status)}
            </p>

            {/* === Jika DITERIMA tampilkan tombol WA === */}
            {data.status === "DITERIMA" && (
              <div className="mt-4">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20panitia,%20saya%20telah%20dinyatakan%20DITERIMA%20dan%20ingin%20konfirmasi%20."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success d-flex align-items-center justify-content-center gap-2 mx-auto px-4 py-2 animate__animated animate__fadeInUp animate__delay-1s"
                  style={{ borderRadius: "30px", fontWeight: "600" }}
                >
                  <i className="bi bi-whatsapp"></i>
                  Hubungi Panitia via WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* PROGRESS */}
          <div className="mb-5">
            <h6 className="fw-semibold mb-2">Progres Seleksi</h6>
            <div className="progress" style={{ height: "12px" }}>
              <div
                className={`progress-bar bg-${statusColor}`}
                style={{
                  width:
                    data.status === "PENDING"
                      ? "30%"
                      : data.status === "DITERIMA"
                      ? "100%"
                      : "100%",
                  transition: "width 1s ease",
                }}
              ></div>
            </div>
          </div>

          {/* DETAIL */}
          <div
            className={`border rounded-4 shadow-sm p-4 animate__animated animate__fadeInUp animate__delay-2s ${
              activeDark ? "bg-dark-subtle" : "bg-white"
            }`}
          >
            <h5 className="fw-semibold mb-4 text-center">Detail Pendaftaran</h5>
            <ul className="list-unstyled mb-0">
              <li className="d-flex justify-content-between border-bottom pb-3 mb-3">
                <span className="text-muted">Tanggal Daftar</span>
                <span className="fw-medium">
                  {new Date(data.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </li>
              <li className="d-flex justify-content-between border-bottom pb-3 mb-3">
                <span className="text-muted">Nama Lengkap</span>
                <span className="fw-medium">{data.nama_lengkap}</span>
              </li>
              <li className="d-flex justify-content-between border-bottom pb-3 mb-3">
                <span className="text-muted">Pilihan Divisi</span>
                <span className="fw-medium">{data.divisi_pilihan}</span>
              </li>
              <li className="d-flex justify-content-between">
                <span className="text-muted">Alasan Bergabung</span>
                <span
                  className="fw-medium text-end"
                  style={{ maxWidth: "60%", lineHeight: "1.6" }}
                >
                  {data.alasan_bergabung}
                </span>
              </li>
            </ul>
          </div>

          {/* Tombol Refresh Manual */}
          <button
            onClick={() => mutate()}
            className="btn btn-outline-primary mt-4"
          >
            🔄 Refresh Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
