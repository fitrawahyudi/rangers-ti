import React from "react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi

function NotFoundPage() {
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center p-5 rounded-3 shadow-sm bg-light">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="fw-bold text-dark">Halaman Tidak Ditemukan</h2>
        <p className="lead text-muted mt-3">
          Maaf, halaman yang kamu cari tidak ada atau mungkin telah dipindahkan.
        </p>
        <Link to="/" className="btn btn-primary btn-lg mt-4">
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
