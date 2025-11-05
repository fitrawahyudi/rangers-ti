// import React from "react";

// const Team = () => {
//   const teamMembers = [
//     {
//       name: "Putri Pebriani",
//       role: "Ketua Panitia",
//       bio: "Ahli dalam pengembangan web dan pemimpin acara.",
//       photo: "../../public/img/team/putri.png",
//     },
//     {
//       name: "Irsan",
//       role: "Sekretaris",
//       bio: "Spesialis komunikasi dan manajemen data.",
//       photo: "../../public/img/team/irsan.png",
//     },
//     {
//       name: "Raizara",
//       role: "Bendahara",
//       bio: "Ahli keuangan dan sponsor organisasi.",
//       photo: "../../public/img/team/raizara.png",
//     },
//     {
//       name: "Fitra Wahyudi Dalimunthe",
//       role: "Koordinator Acara",
//       bio: "Pengalaman dalam event planning TI.",
//       photo: "../../public/img/team/fitra.png",
//     },
//   ];

//   return (
//     <section id="team" className="py-5">
//       <div className="container">
//         <h2 className="text-center mb-5">Tim Kami</h2>
//         <div className="row">
//           {teamMembers.map((member, index) => (
//             <div key={index} className="col-md-3 mb-4">
//               <div className="card shadow h-100">
//                 <img
//                   src={member.photo}
//                   className="card-img-top"
//                   alt={member.name}
//                 />
//                 <div className="card-body text-center">
//                   <h5 className="card-title">{member.name}</h5>
//                   <p className="card-text text-muted">{member.role}</p>
//                   <p className="card-text small">{member.bio}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Team;
import React from "react";

const Team = () => {
  const teamMembers = [
    {
      name: "Putri Pebriani",
      role: "Ketua Panitia",
      bio: "Ahli dalam pengembangan web dan pemimpin acara.",
      photo: "../../public/img/team/putri.png",
    },
    {
      name: "Irsan",
      role: "Sekretaris",
      bio: "Spesialis komunikasi dan manajemen data.",
      photo: "../../public/img/team/irsan.png",
    },
    {
      name: "Raizara",
      role: "Bendahara",
      bio: "Ahli keuangan dan sponsor organisasi.",
      photo: "../../public/img/team/raizara.png",
    },
    {
      name: "Fitra Wahyudi Dalimunthe",
      role: "Koordinator Acara",
      bio: "Pengalaman dalam event planning TI.",
      photo: "../../public/img/team/fitra.png",
    },
  ];

  return (
    <section id="team" className="py-5">
      <div className="container">
        <h2 className="text-center mb-5">Tim Kami</h2>
        <div className="row">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card shadow h-100 team-card">
                <img
                  src={member.photo}
                  className="card-img-top team-photo"
                  alt={member.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text text-muted">{member.role}</p>
                  <p className="card-text small">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
