// frontend/src/pages/PublicForm.jsx

import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'; 
import 'sweetalert2/dist/sweetalert2.min.css'; // 
import { useNavigate,Link } from 'react-router-dom';

function PublicForm() {
  const navigate = useNavigate();
  const DIVISI_CHOICES = [
    { value: "MC", label: "Mc" },
    { value: "PEMATERI", label: "Pemateri" },
    { value: "VOLUNTEER", label: "Volunteer" },
    { value: "PEMBACA_DOA", label: "Pembaca Doa" },
  ];
  const ACC = ["Ya", "Tidak"];
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    npm: "",
    angkatan: "",
    no_wa: "",
    email: "",
    password: "",
    program_studi: "",
    divisi_pilihan: DIVISI_CHOICES[0].value,
    bersedia: ACC[0],
    alasan_bergabung: "",
  });

  // 3. Kita tidak perlu state message dan isError lagi
  // const [message, setMessage] = useState("");
  // const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      
      // Kosongkan form (lakukan ini dulu)
      setFormData({
        nama_lengkap: "",
        npm: "",
        angkatan: "",
        no_wa: "",
        email: "",
        password: "",
        program_studi: "",
        divisi_pilihan: DIVISI_CHOICES[0].value,
        bersedia: ACC[0],
        alasan_bergabung: "",
      });

      // --- 3. MODIFIKASI BAGIAN INI ---
      Swal.fire({
        icon: 'success',
        title: 'Pendaftaran Berhasil!',
        text: response.data.message, 
        timer: 2000, // Timer bisa dipercepat sedikit
        showConfirmButton: false,
      }).then(() => {
        // Setelah alert ditutup, redirect ke halaman login
        navigate('/login'); // <-- Arahkan ke halaman login volunteer
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops... Pendaftaran Gagal',
        text: error.response?.data?.error || "Terjadi kesalahan pada server.",
      });
    }
  };

  // ... (renderDivisiOptions dan renderAccOptions tetap sama)
  const renderDivisiOptions = () => {
    return DIVISI_CHOICES.map((divisi) => (
      <option key={divisi.value} value={divisi.value}>
        {divisi.label}
      </option>
    ));
  };
  const renderAccOptions = () => {
    return ACC.map((acc) => (
      <option key={acc} value={acc}>
        {acc}
      </option>
    ));
  };


  return (
    <div className="container-md my-5 p-4 p-md-5 border rounded shadow bg-white">
      <h2 className="h3 fw-bold mb-4 text-center">
        Pendaftaran Volunteer
        <br />
        Rangers TI Batch 4
      </h2>

      {/* --- 6. HAPUS BLOK ALERT YANG LAMA --- */}
      {/* {message && (
          <div
            className={`alert ${ ... }`}
            role="alert"
          >
            {message}
          </div>
        )} 
      */}

      <form onSubmit={handleSubmit}>
        {/* ... (Semua input form kamu tetap sama) ... */}
         {/* --- Data Akun --- */}
         <h3 className="h5 fw-semibold border-bottom pb-2 mt-4 mb-3">
          Data Akun
        </h3>
        <div className="alert alert-primary" role="alert">
          <strong>Info:</strong> Email dan password ini akan digunakan untuk login di halaman 
          <Link to="/login" className="alert-link"> Cek Status </Link>
          setelah mendaftar, untuk mendapatkan informasi tentang Status Pendaftaran
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email" id="email" name="email"
            value={formData.email} onChange={handleChange}
            placeholder="email@gmail.com" required className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password" id="password" name="password"
            value={formData.password} onChange={handleChange}
            placeholder="Buat password yang kuat" required className="form-control"
          />
        </div>

        {/* --- Data Diri --- */}
        <h3 className="h5 fw-semibold border-bottom pb-2 mb-3">Data Diri</h3>
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="nama_lengkap">
            Nama Lengkap
          </label>
          <input
            type="text" id="nama_lengkap" name="nama_lengkap"
            value={formData.nama_lengkap} onChange={handleChange}
            placeholder="Nama Kamu" required className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="program_studi">
            Program Studi
          </label>
          <input
            type="text" id="program_studi" name="program_studi"
            value={formData.program_studi} onChange={handleChange}
            placeholder="Contoh. D3 Teknik Informatika" required className="form-control"
          />
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold" htmlFor="npm">
              NPM
            </label>
            <input
              type="text" id="npm" name="npm"
              value={formData.npm} onChange={handleChange}
              placeholder="Cth. 2309020174" required className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold" htmlFor="angkatan">
              Angkatan (Tahun)
            </label>
            <input
              type="number" id="angkatan" name="angkatan"
              value={formData.angkatan} onChange={handleChange}
              placeholder="2023" required className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label fw-bold" htmlFor="no_wa">
            Nomor WhatsApp
          </label>
          <input
            type="text" id="no_wa" name="no_wa"
            value={formData.no_wa} onChange={handleChange}
            placeholder="081234567890" required className="form-control"
          />
        </div>

        {/* --- Pilihan Divisi --- */}
        <h3 className="h5 fw-semibold border-bottom pb-2 mt-4 mb-3">
          Pilihan Divisi
        </h3>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold" htmlFor="divisi_pilihan">
              Pilihan Divisi
            </label>
            <select
              id="divisi_pilihan"
              name="divisi_pilihan"
              value={formData.divisi_pilihan}
              onChange={handleChange}
              required
              className="form-select"
            >
              {renderDivisiOptions()}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold" htmlFor="bersedia">
              Apakah kamu bersedia jika tidak di tempatkan di divisi yang kamu
              inginkan?
            </label>
            <select
              id="bersedia"
              name="bersedia"
              value={formData.bersedia}
              onChange={handleChange}
              required
              className="form-select"
            >
              {renderAccOptions()}
            </select>
          </div>
        </div>

        {/* --- Alasan --- */}
        <div className="mb-3 mt-3">
          <label className="form-label fw-bold" htmlFor="alasan_bergabung">
            Alasan Bergabung
          </label>
          <textarea
            id="alasan_bergabung" name="alasan_bergabung" rows="4"
            value={formData.alasan_bergabung} onChange={handleChange}
            required className="form-control"
            placeholder="Ceritakan alasanmu ingin bergabung..."
          />
        </div>

        {/* --- Submit --- */}
        <button
          type="submit"
          className="btn btn-primary btn-lg w-100 mt-4"
        >
          Daftar Sekarang
        </button>
      </form>
    </div>
  );
}

export default PublicForm;