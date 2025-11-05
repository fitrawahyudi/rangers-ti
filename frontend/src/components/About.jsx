import React from "react";

const About = () => {
  const data = [
    "Edukasi AI & Literasi Digital",
    "Pelatihan Keterampilan Kreatif & Teknis",
    "Bimbingan & Inspirasi Karier Teknologi",
  ];
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-4">Tentang Rangers TI</h2>
            <p>
              Rangers TI adalah sebuah kegiatan sukarelawan dari HIMATIF dan
              Mahasiswa Teknologi Informasi UMSU untuk mengabdi kepada
              masyarakat dalam pengembangan pendidikan Teknologi.
            </p>
            <ul className="list-unstyled">
              {data.map((d) => (
                <li>
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
