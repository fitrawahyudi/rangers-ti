// frontend/src/pages/VolunteerLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function VolunteerLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Panggil endpoint login VOLUNTEER
      const response = await axios.post(
        "http://localhost:5000/volunteer/login",
        {
          username,
          password,
        }
      );

      // Simpan token di localStorage (gunakan nama beda!)
      localStorage.setItem("volunteerToken", response.data.token);
      navigate("/status"); // Arahkan ke halaman status
    } catch (err) {
      setError(err.response?.data?.error || "Login gagal");
    }
  };

  return (
    <>
      <title>Login User</title>

      <div className="container" style={{ maxWidth: "500px" }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  Login Cek Status
                </h3>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukkan username anda"
                      required
                    />
                    <label htmlFor="username">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="d-grid mt-4 mb-0">
                    <button type="submit" className="btn btn-primary btn-block">
                      Masuk
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3">
                <div className="small">
                  Belum punya akun? <Link to="/">Daftar di sini</Link>
                </div>
                <div className="small mt-2">
                  <Link to="/admin/login">Login sebagai Admin</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default VolunteerLogin;
