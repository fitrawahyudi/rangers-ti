import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="">
          <h3>Rangers TI</h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                Tentang
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#team">
                Core Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#events">
                Kegiatan
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Kontak
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
