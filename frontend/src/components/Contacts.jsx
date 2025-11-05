import React, { useState } from "react";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesan terkirim! Kami akan segera menghubungi Anda.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-5">
      <div className="container">
        <h2 className="text-center mb-5">Hubungi Kami</h2>
        <div className="row">
          <div className="col-md-6">
            <h5>Informasi Kontak</h5>
            <p>
              <i className="bi bi-envelope me-2"></i>info@rangersti.com
            </p>
            <p>
              <i className="bi bi-phone me-2"></i>+62 123 456 789
            </p>
            <p>
              <i className="bi bi-geo-alt me-2"></i>Jakarta, Indonesia
            </p>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Nama"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control"
                  rows="4"
                  placeholder="Pesan"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
