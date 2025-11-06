import React from "react";
import "../App.css";

const Gallery = () => {
  const imagesBatch1 = [
    "/img/gallery/batch1-1.jpg",
    "/img/gallery/batch1-2.jpg",
    "/img/gallery/batch1-3.jpg",
    "/img/gallery/batch1-4.jpg",
  ];
  const imagesBatch2 = [
    "/img/gallery/batch2-1.jpg",
    "/img/gallery/batch2-2.jpg",
    "/img/gallery/batch2-3.jpg",
    "/img/gallery/batch2-4.jpg",
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Galeri Kegiatan</h2>
        <div className="row">
          <h3>Batch 1</h3>
          {imagesBatch1.map((img, index) => (
            <div key={index} className="col-md-3 mb-4">
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="img-fluid rounded shadow"
              />
            </div>
          ))}
          <h3>Batch 2</h3>
          {imagesBatch2.map((img, index) => (
            <div key={index} className="col-md-3 mb-4">
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="img-fluid rounded shadow gallery-item-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
