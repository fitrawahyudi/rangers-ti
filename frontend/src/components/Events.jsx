import React from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      title: "Rangers TI Batch 4",
      date: "16 November 2025",
      description: "Pengabdian masyarakat di panti asuhan.",
      image: "../../public/img/events/batch4.jpg",
    },
  ];

  return (
    <section id="events" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Kegiatan Mendatang</h2>
        <div className="row">
          {events.map((event, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow h-100">
                <img
                  src={event.image}
                  className="card-img-top"
                  alt={event.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">
                    <i className="bi bi-calendar me-2"></i>
                    {event.date}
                  </p>
                  <p className="card-text">{event.description}</p>
                  <Link to="/daftar-batch-4">
                    <button className="btn btn-primary">
                      Daftar
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
