// frontend/src/pages/AdminLogin.jsx (Versi Bootstrap)
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://backend-rangers-ti.up.railway.app/";
function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Panggil API login admin
      const response = await axios.post(`${API_URL}/admin/login`, {
        username,
        password,
      });

      // 2. Simpan token admin
      const { token } = response.data;
      localStorage.setItem("adminToken", token); // Pastikan nama token beda

      // 3. Arahkan ke dashboard admin
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login gagal");
    }
  };

  return (
    <>
      <title>Login Admin</title>

      {/* // Gunakan container dengan max-width untuk membatasi lebar form */}
      <div className="container" style={{ maxWidth: "500px" }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            {/* Gunakan komponen Card Bootstrap */}
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  Login Admin Rangers TI
                </h3>
              </div>
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger text-center" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Gunakan Form Floating untuk input modern */}
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukkan username"
                    />
                    <label htmlFor="username">Username</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  {/* Gunakan d-grid untuk tombol full-width */}
                  <div className="d-grid mt-4 mb-0">
                    <button type="submit" className="btn btn-primary btn-block">
                      Masuk
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3">
                <div className="small">
                  {/* Link untuk kembali ke login volunteer */}
                  <Link to="/login">Login sebagai Volunteer?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
