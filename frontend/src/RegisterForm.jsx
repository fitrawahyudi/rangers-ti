// frontend/src/RegisterForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterForm() {
  // State untuk menampung data form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handler saat input berubah
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman

    try {
      // Kirim data ke backend (pastikan URL-nya benar)
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );

      // Kosongkan form setelah sukses
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      // Tangani error dari server (misal: email sudah ada)
      setMessage(error.response?.data?.error || "Registrasi gagal.");
      setIsError(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h4>Form Pendaftaran Anggota</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Nama */}
            <div className="mb-3">
              <label className="form-label">Nama Lengkap</label>
              <input
                type="text"
                className="form-control"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Kata Sandi</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                required
              />
            </div>
            {/* Tombol Submit */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-4">
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
