// frontend/src/VolunteerForm.jsx (Versi Bootstrap)
import React, { useState } from "react";
import axios from "axios";

// Definisikan pilihan divisi (HARUS SAMA DENGAN ENUM PRISMA)
// const DIVISI_CHOICES = ["VOLUNTEER", "MC", "PEMATERI", "PEMBACA_DOA"];
const DIVISI_CHOICES = [
  { value: "MC", label: "Mc" },
  { value: "PEMATERI", label: "Pemateri" },
  { value: "VOLUNTEER", label: "Volunteer" },
  { value: "PEMBACA_DOA", label: "Pembaca Doa" },
];

const ACC = ["Ya", "Tidak"];

function VolunteerForm() {
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    npm: "",
    angkatan: "",
    no_wa: "",
    email: "",
    password: "",
    program_studi: "",
    divisi_pilihan: DIVISI_CHOICES.value,
    bersedia: ACC[0],
    alasan_bergabung: "",
    kontribusi: "",
    alasan_memilih_divisi: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    // Kirim ke API
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      setMessage(response.data.message);
      setIsError(false);

      // Kosongkan form (atau redirect ke halaman sukses)
      setFormData({
        nama_lengkap: "",
        npm: "",
        angkatan: "",
        no_wa: "",
        email: "",
        password: "",
        program_studi: "",
        divisi_pilihan: DIVISI_CHOICES[0],
        bersedia: ACC[0],
        alasan_bergabung: "",
        kontribusi: "",
        alasan_memilih_divisi: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.error || "Pendaftaran gagal.");
      setIsError(true);
    }
  };

  // Helper untuk render <select> (Tidak berubah)
  const renderDivisiOptions = () => {
    return DIVISI_CHOICES.map(({ label }) => (
      <option key={label} value={label}>
        {label}
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
    // Menggunakan class container, margin, padding, shadow, dan border Bootstrap
    <div className="container-md my-5 p-4 p-md-5 border rounded shadow bg-white">
      <h2 className="h3 fw-bold mb-4 text-center">
        Pendaftaran Volunteer
        <br />
        Rangers TI Batch 4
      </h2>

      {/* Menggunakan Alert Bootstrap untuk pesan */}
      {message && (
        <div
          className={`alert ${
            isError ? "alert-danger" : "alert-success"
          } text-center`}
          role="alert"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* --- Akun --- */}
        <h3 className="h5 fw-semibold border-bottom pb-2 mt-4 mb-3">
          Data Akun
        </h3>
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@gmail.com"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Buat password yang kuat"
            required
            className="form-control"
          />
        </div>

        {/* --- Data Diri --- */}
        <h3 className="h5 fw-semibold border-bottom pb-2 mb-3">Data Diri</h3>

        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="nama_lengkap">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="nama_lengkap"
            name="nama_lengkap"
            value={formData.nama_lengkap}
            onChange={handleChange}
            placeholder="Nama Kamu"
            required
            className="form-control"
          />
        </div>

        {/* Menggunakan Grid (row/col) Bootstrap */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold" htmlFor="nim">
              NIM
            </label>
            <input
              type="text"
              id="nim"
              name="nim"
              value={formData.npm}
              onChange={handleChange}
              placeholder="Cth. 2309020174"
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold" htmlFor="angkatan">
              Angkatan (Tahun)
            </label>
            <input
              type="number"
              id="angkatan"
              name="angkatan"
              value={formData.angkatan}
              onChange={handleChange}
              placeholder="2023"
              required
              className="form-control"
            />
          </div>
        </div>

        <div className="mb-3 mt-3">
          {" "}
          {/* Tambah mt-3 untuk spasi setelah grid */}
          <label className="form-label fw-bold" htmlFor="no_wa">
            Nomor WhatsApp
          </label>
          <input
            type="text"
            id="no_wa"
            name="no_wa"
            value={formData.no_wa}
            onChange={handleChange}
            placeholder="081234567890"
            required
            className="form-control"
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
              className="form-select" // Menggunakan form-select
            >
              {renderDivisiOptions()}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold" htmlFor="divisi_pilihan">
              Apakah kamu bersedia jika tidak di tempatkan di divisi yang kamu
              inginkan?
            </label>
            <select
              id="divisi_pilihan"
              name="divisi_pilihan"
              value={formData.bersedia}
              onChange={handleChange}
              required
              className="form-select" // Menggunakan form-select
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
            id="alasan_bergabung"
            name="alasan_bergabung"
            rows="4"
            value={formData.alasan_bergabung}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Ceritakan alasanmu ingin bergabung..."
          />
        </div>

        {/* --- Submit --- */}
        <button
          type="submit"
          className="btn btn-primary btn-lg w-100 mt-4" // Class button Bootstrap
        >
          Daftar Sekarang
        </button>
      </form>
    </div>
  );
}

export default VolunteerForm;
