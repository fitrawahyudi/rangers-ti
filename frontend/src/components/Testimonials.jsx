import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Mahasiswa TI",
      quote: "Rangers TI membantu saya belajar banyak tentang teknologi!",
    },
    {
      name: "Jane Smith",
      role: "Developer",
      quote: "Acara mereka sangat inspiratif dan profesional.",
    },
  ];

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5">Testimoni</h2>
        <div className="row">
          {testimonials.map((test, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card shadow p-4">
                <blockquote className="blockquote">
                  <p>"{test.quote}"</p>
                  <footer className="blockquote-footer">
                    {test.name}, <cite title="Source Title">{test.role}</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
