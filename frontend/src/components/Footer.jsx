import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container text-center">
        <p>&copy; 2025 Rangers TI. All rights reserved.</p>
        <div className="mb-3">
          <a
            style={{
              textDecoration: "none",
            }}
            href="https://instagram.com/rangersti_action"
            className="text-white me-3"
            target="_blank"
          >
            <i className="bi bi-instagram"></i> Instagram
          </a>
        </div>
        <p>Didukung oleh HIMATIF</p>
      </div>
    </footer>
  );
};

export default Footer;
