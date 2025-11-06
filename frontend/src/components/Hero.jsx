import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="hero d-flex align-items-center text-white"
      style={{
        backgroundImage: "url(/img/hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
      }}
    >
      <div className="container text-center">
        <h1 className="display-2 fw-bold">Bergabunglah dengan Rangers TI</h1>
        <p className="lead fs-4">
          Mendorong Inovasi Teknologi Informasi Melalui Kegiatan Berkualitas dan
        </p>
        <a href="#events" className="btn btn-light btn-lg me-3">
          Lihat Kegiatan
        </a>
        <Link to="/daftar-batch-4">
          <button className="btn btn-outline-light btn-lg">
            Daftar Sekarang
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
